import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { clearActiveChat } from '../../redux/slices/messageSlice';
import ChatHeader from '../ChatHeader';
import MatchDisplay from '../MatchDisplay';
import ChatContainer from '../ChatContainer';
import './profileContainer.scss';

const ProfileContainer = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleMatches = () => {
		if (selectedProfile) {
			dispatch(setSelectedProfile(null));
			dispatch(clearActiveChat());
		} else {
			return;
		}
	};

	const handleChat = () => {};

	return (
		<div id='profile-container'>
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
					<Stack direction='column' alignItems='center'>
						<div className='img-container'>
							<img
								src={selectedProfile?.profilePhoto}
								alt={selectedProfile.handle}
							/>
						</div>
						<h5>@{selectedProfile?.handle}</h5>
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
				{selectedProfile && <ChatContainer />}
			</div>
		</div>
	);
};

export default ProfileContainer;
