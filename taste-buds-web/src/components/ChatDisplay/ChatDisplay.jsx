import { useSelector } from 'react-redux';
import './chatDisplay.scss';
import ChatBubble from '../ChatBubble';

const ChatDisplay = () => {
	const { activeChat, typing } = useSelector((state) => state.message);
	const conversation = activeChat?.messages;

	return (
		<div id='chat-display'>
			{conversation?.map((item) => (
				<ChatBubble key={item._id} data={item} />
			))}
			{typing && <ChatBubble typing />}
		</div>
	);
};

export default ChatDisplay;
