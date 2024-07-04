import { useSelector } from 'react-redux';
import Chat from '../Chat';
import ChatInput from '../ChatInput';
import './display.scss';

const ChatDisplay = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);

	return (
		<>
			<Chat />
			<ChatInput />
		</>
	);
};

export default ChatDisplay;
