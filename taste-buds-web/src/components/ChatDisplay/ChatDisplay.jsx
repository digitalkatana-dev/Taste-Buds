import { useSelector } from 'react-redux';
import './chatDisplay.scss';
import ChatBubble from '../ChatBubble';

const ChatDisplay = () => {
	const { activeChat } = useSelector((state) => state.message);
	const conversation = activeChat?.messages;

	return (
		<div id='chat-display'>
			{conversation?.map((item) => (
				<ChatBubble key={item._id} data={item} />
			))}
		</div>
	);
};

export default ChatDisplay;
