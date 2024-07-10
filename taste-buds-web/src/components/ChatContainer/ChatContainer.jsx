import ChatDisplay from '../ChatDisplay';
import ChatInput from '../ChatInput';
import './chatContainer.scss';

const ChatContainer = () => {
	return (
		<div id='chat-container'>
			<ChatDisplay />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
