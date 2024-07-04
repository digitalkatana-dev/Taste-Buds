import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import ChatHeader from '../ChatHeader';
import MatchDisplay from '../MatchDisplay';
import ChatDisplay from '../ChatDisplay';
import './container.scss';

const ChatContainer = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	return (
		<div id='chat-container'>
			<ChatHeader />

			<div>
				<button className='option'>Matches</button>
				<button className='option' disabled={!selectedProfile}>
					Chat
				</button>
			</div>
			<div className='display-container'>
				{!selectedProfile && <MatchDisplay />}
				{selectedProfile && <ChatDisplay />}
			</div>
		</div>
	);
};

export default ChatContainer;
