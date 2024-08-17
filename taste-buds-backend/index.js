require('./src/models/User');
require('./src/models/Profile');
require('./src/models/Chat');
require('./src/models/Message');
require('./src/models/Notification');
const { config } = require('dotenv');
const { set, connect, connection } = require('mongoose');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const assetRoutes = require('./src/routes/assetRoutes');
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
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
	pingInterval: 25000,
	pingTimeout: 60000,
});

const activeSockets = new Set();

io.on('connection', (socket) => {
	socket.on('setup', (userData) => {
		console.log(`User connected: ${userData}`);
		socket.join(userData);
		socket.emit('connected');
		activeSockets.add(socket.id);
	});

	socket.on('refresh', (userData) => {
		console.log(`User refreshed: ${userData}`);
		socket.join(userData);
		socket.emit('reconnected');
		activeSockets.add(socket.id);
		console.log('Active Sockets', activeSockets);
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
	}, 30000);

	socket.on('join room', (room) => {
		console.log('Joined room:', room);
		socket.join(room);
		socket.emit('joined');
		activeChats.add(room);
	});

	socket.on('rejoin', (room) => {
		console.log(`Room refreshed: ${room}`);
		socket.join(room);
		socket.emit('rejoined');
		activeChats.add(room);
		console.log('Active Chats', activeChats);
	});

	socket.on('typing', (room) => {
		socket.in(room).emit('typing');
		console.log('typing!');
	});

	socket.on('stop typing', (room) => {
		socket.in(room).emit('stop typing');
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
		activeSockets.delete(socket.id);
	});

	socket.on('logout', () => {
		if (activeSockets.size > 1) {
			activeSockets.delete(socket.id);
		} else {
			activeSockets.clear();
		}
		console.log('Socket disconnected');
		socket.disconnect();
	});
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
