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

socket.on('joined', (socketId) =>
	console.log(`Joined successfully, with socket id: ${socketId}`)
);
socket.on('rejoined', () => console.log('Rejoined successfully!'));
socket.on('typing', () => console.log('someone is typing'));

export const emitNotification = (recipient, user) => {
	if (recipient === user) return;

	socket.emit('notification received', recipient);
};
