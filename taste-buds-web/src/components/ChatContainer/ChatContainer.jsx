import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { clearConversation } from '../../redux/slices/messageSlice';
import ChatHeader from '../ChatHeader';
import MatchDisplay from '../MatchDisplay';
import ChatDisplay from '../ChatDisplay';
import './container.scss';

const ChatContainer = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleMatches = () => {
		if (selectedProfile) {
			dispatch(setSelectedProfile(null));
			dispatch(clearConversation());
		} else {
			return;
		}
	};

	const handleChat = () => {};

	return (
		<div id='chat-container'>
			<ChatHeader />

			<div>
				<button className='option' onClick={handleMatches}>
					Matches
				</button>
				<button
					className='option'
					disabled={!selectedProfile}
					onClick={handleChat}
				>
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
