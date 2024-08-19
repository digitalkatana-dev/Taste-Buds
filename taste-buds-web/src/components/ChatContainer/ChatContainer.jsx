import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../util/socket';
import ChatDisplay from '../ChatDisplay';
import ChatInput from '../ChatInput';
import './chatContainer.scss';

const ChatContainer = () => {
	const { activeChat } = useSelector((state) => state.message);

	useEffect(() => {
		activeChat && socket.emit('join chat', activeChat?._id);

		return () => {
			activeChat && socket.emit('leave chat', activeChat?._id);
		};
	}, [activeChat]);

	return (
		<div id='chat-container'>
			<ChatDisplay />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
