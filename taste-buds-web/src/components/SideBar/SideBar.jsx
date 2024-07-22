import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import { clearActiveChat } from '../../redux/slices/messageSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import './side-bar.scss';
import MatchDisplay from '../MatchDisplay';
import ChatContainer from '../ChatContainer';

const SideBar = () => {
	const { theme, selectedProfile } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleUserProfileClick = () => {
		navigate('/profile');
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleMatchesClick = () => {
		if (selectedProfile) {
			dispatch(setSelectedProfile(null));
			dispatch(clearActiveChat());
		} else {
			return;
		}
	};

	const handleMatchProfileClick = () => {
		navigate(`/selected-profile/${selectedProfile._id}`);
	};

	return (
		<div className={theme === 'dark' ? 'side-bar dark' : 'side-bar'}>
			<div className='header'>
				<div className='user-profile' onClick={handleUserProfileClick}>
					<div className='img-container'>
						<img src={user?.profilePhoto} alt={user?.firstName} />
					</div>
					<h3>@{user?.handle}</h3>
				</div>
				<IconButton className='log-out' onClick={handleLogout}>
					<LogoutIcon fontSize='small' />
				</IconButton>
			</div>
			<Stack
				direction='row'
				justifyContent={selectedProfile ? 'space-between' : 'unset'}
				alignItems={selectedProfile ? 'center' : 'unset'}
			>
				<button
					className={selectedProfile ? 'option off' : 'option'}
					onClick={handleMatchesClick}
				>
					Matches
				</button>
				{selectedProfile && (
					<IconButton
						className='match-profile-btn'
						onClick={handleMatchProfileClick}
					>
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

export default SideBar;
