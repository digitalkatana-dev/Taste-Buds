require('./src/models/User');
require('./src/models/Profile');
require('./src/models/Chat');
require('./src/models/Message');
require('./src/models/Notification');
const { config } = require('dotenv');
const { set, connect, connection } = require('mongoose');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
// const assetRoutes = require('./src/routes/assetRoutes');
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

set('strictQuery', false);

connect(process.env.MONGODB_URL);

connection.on('connected', () => {
	console.log('Connected to DB.');
});
connection.on('error', (err) => {
	console.log('Error connecting to DB.', err);
});

// app.use(assetRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(chatRoutes);
app.use(messageRoutes);
app.use(notificationRoutes);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'https://taste-buds.onrender.com',
		methods: ['GET', 'POST'],
	},
	pingInterval: 25000,
	pingTimeout: 60000,
});

const pubClient = createClient({
	url: 'redis://red-cr0d50o8fa8c73d31mn0:6379',
});
const subClient = pubClient.duplicate();

pubClient.on('error', (err) => console.error('Redis Pub Client Error', err));
subClient.on('error', (err) => console.error('Redis Sub Client Error', err));

try {
	Promise.all([pubClient.connect(), subClient.connect()]);
	io.adapter(createAdapter(pubClient, subClient));

	console.log('Socket.io is connected to Redis');
} catch (err) {
	console.error;
}

const activeSockets = new Set();
const activeChats = new Set();
const activeChatMembers = new Set();

io.on('connection', (socket) => {
	socket.on('setup', (userData) => {
		pubClient.sAdd(`socket: ${userData}`, socket.id);
		socket.join(userData);
		activeSockets.add(socket.id);
		socket.emit('connected');
		console.log(`User connected: ${userData}`);
	});

	socket.on('reconnect', async (userData) => {
		const exists = await pubClient.exists(`socket: ${userData}`);

		if (exists) {
			const members = await pubClient.sMembers(`socket: ${userData}`);
			pubClient.del(`socket: ${userData}`);
			activeSockets.delete(members);
		}
		pubClient.sAdd(`socket: ${userData}`, socket.id);
		socket.join(userData);
		activeSockets.add(socket.id);
		socket.emit('reconnected');
		console.log(`User reconnected: ${userData}`);
	});

	socket.on('pong', () => {
		console.log('Pong!');
	});

	const pingInterval = setInterval(() => {
		if (activeSockets.size === 0) {
			clearInterval(pingInterval);
		} else {
			io.emit('ping');
		}
		console.log('Active Sockets', activeSockets);
		console.log('Active Chats', activeChats);
		console.log('Active Chat Members', activeChatMembers);
	}, 30000);

	socket.on('join chat', async (chatId) => {
		pubClient.sAdd(`chat: ${chatId}`, socket.id);
		socket.join(chatId);
		activeChats.add(chatId);
		activeChatMembers.add(socket.id);
		socket.emit('joined', socket.id);
	});

	socket.on('rejoin chat', async (chatId, deadSocket) => {
		const chatExists = await pubClient.exists(`chat: ${chatId}`);
		if (chatExists) {
			const members = await pubClient.sMembers(`chat: ${chatId}`);
			const memberExists = members.some((member) => member === deadSocket);

			if (memberExists) {
				await pubClient.sRem(`chat: ${chatId}`, deadSocket);
				console.log('Does chat still exist?', chatExists);
				pubClient.sAdd(`chat: ${chatId}`, socket.id);
				socket.join(chatId);
				activeChats.add(chatId);
				activeChatMembers.delete(deadSocket);
				activeChatMembers.add(socket.id);
			}

			socket.emit('rejoined', socket.id);
		}
	});

	socket.on('leave chat', async (chatId) => {
		await pubClient.sRem(`chat: ${chatId}`, socket.id);
		socket.leave(chatId);
		activeChatMembers.delete(socket.id);
		const members = await pubClient.sMembers(`chat: ${chatId}`);
		if (members.length === 0) {
			activeChats.delete(chatId);
			pubClient.del(`chat: ${chatId}`);
			console.log(
				`Chat ${chatId} is now empty and has been removed from activeChats.`,
				activeChats
			);
		}
	});

	socket.on('typing', async (chatId) => {
		const members = await pubClient.sMembers(`chat: ${chatId}`);
		const sanitizedMembers = members.filter((member) => member !== socket.id);
		sanitizedMembers?.forEach((member) => {
			io.to(member).emit('typing');
		});
	});

	socket.on('stop typing', async (chatId) => {
		const members = await pubClient.sMembers(`chat: ${chatId}`);
		const sanitizedMembers = members.filter((member) => member !== socket.id);
		sanitizedMembers?.forEach((member) => {
			io.to(member).emit('stop typing');
		});
	});

	socket.on('notification received', (room) => {
		console.log('new notification for:', room);
		socket.in(room).emit('notification received');
	});

	socket.on('new message', (newMessage) => {
		let chat = newMessage.chat;
		if (!chat.users) return console.log('Chat.users not defined');

		chat.users.forEach((user) => {
			if (user == newMessage.sender._id) return;
			socket.in(user).emit('message received', chat._id);
		});
	});

	socket.on('disconnect', () => {
		pubClient.keys('socket:*').then((keys) => {
			keys.forEach((key) => {
				pubClient.sRem(key, socket.id).then(() => {
					pubClient.sCard(key).then((count) => {
						if (count === 0) pubClient.del(key);
					});
				});
			});
		});
		activeSockets.delete(socket.id);
	});

	socket.on('logout', (userData) => {
		if (activeSockets.size > 1) {
			activeSockets.delete(socket.id);
		} else {
			activeSockets.clear();
			pubClient.del(`socket: ${userData}`);
		}
		socket.disconnect();
		console.log('Socket disconnected');
	});
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
