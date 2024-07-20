import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { clearActiveChat } from '../../redux/slices/messageSlice';
import ChatHeader from '../ChatHeader';
import MatchDisplay from '../MatchDisplay';
import ChatContainer from '../ChatContainer';
import './profileContainer.scss';

const ProfileContainer = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleMatches = () => {
		if (selectedProfile) {
			dispatch(setSelectedProfile(null));
			dispatch(clearActiveChat());
		} else {
			return;
		}
	};

	const handleProfileClick = () => {
		navigate(`/selected-profile/${selectedProfile._id}`);
	};

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
					<IconButton className='profile-btn' onClick={handleProfileClick}>
						<div className='img-container'>
							<img
								src={selectedProfile?.profilePhoto}
								alt={selectedProfile?.handle}
							/>
						</div>
						<h6>@{selectedProfile?.handle}</h6>
					</IconButton>
				)}
				<button className='option' disabled={!selectedProfile}>
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
