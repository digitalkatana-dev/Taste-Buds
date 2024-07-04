import { Stack } from '@mui/material';
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

			<Stack
				direction='row'
				justifyContent={selectedProfile ? 'space-between' : 'unset'}
				alignItems={selectedProfile ? 'center' : 'unset'}
			>
				<button
					className={selectedProfile ? 'option mockDisabled' : 'option'}
					onClick={handleMatches}
				>
					Matches
				</button>
				{selectedProfile && (
					<Stack direction='row' gap='5px' alignItems='center' margin='0 10px'>
						<div className='img-container'>
							<img
								src={selectedProfile?.profilePhoto}
								alt={selectedProfile.handle}
							/>
						</div>
						<h4>@{selectedProfile?.handle}</h4>
					</Stack>
				)}
				<button
					className='option'
					disabled={!selectedProfile}
					onClick={handleChat}
				>
					Chat
				</button>
			</Stack>
			<div className='display-container'>
				{!selectedProfile && <MatchDisplay />}
				{selectedProfile && <ChatDisplay />}
			</div>
		</div>
	);
};

export default ChatContainer;
