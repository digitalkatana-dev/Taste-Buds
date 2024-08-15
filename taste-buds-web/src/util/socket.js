import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3005');

socket.on('connected', () => {
	console.log('You are connected!');
});

socket.on('reconnected', () => {
	console.log('You are reconnected!');
});

socket.on('ping', () => {
	console.log('Ping!');
	socket.emit('pong');
});

socket.on('joined', () => console.log('Joined successfully!'));
socket.on('rejoined', () => console.log('Rejoined successfully!'));
socket.on('typing', () => console.log('someone is typing'));

export const emitNotification = (userId, user) => {
	if (userId === user) return;

	socket.emit('notification received', userId);
};
