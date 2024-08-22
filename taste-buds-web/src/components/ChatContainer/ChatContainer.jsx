import { useDispatch } from 'react-redux';
import { setSocketId } from '../../redux/slices/messageSlice';
import { socket } from '../../util/socket';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './components/ChatInput';
import './chatContainer.scss';

const ChatContainer = () => {
	const dispatch = useDispatch();

	socket.on('joined', (id) => {
		dispatch(setSocketId(id));
	});

	return (
		<div id='chat-container'>
			<ChatDisplay />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
