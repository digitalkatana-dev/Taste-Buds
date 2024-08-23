import { IconButton, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import { clearActiveChat } from '../../redux/slices/messageSlice';
import { socket } from '../../util/socket';
import LogoutIcon from '@mui/icons-material/Logout';
import './side-bar.scss';
import NotificationButton from '../NotificationButton/NotificationButton';
import MatchDisplay from '../MatchDisplay';
import ChatContainer from '../ChatContainer';

const SideBar = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat } = useSelector((state) => state.message);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = activeUser?.theme;

	const handleUserProfileClick = () => {
		navigate('/profile');
	};

	const handleLogout = () => {
		dispatch(logout(activeUser._id));
	};

	const handleMatchesClick = () => {
		if (selectedProfile) {
			dispatch(setSelectedProfile(null));
			dispatch(clearActiveChat());
		} else {
			return;
		}
	};

	useEffect(() => {
		activeChat && socket.emit('join chat', activeChat?._id);

		return () => {
			activeChat && socket.emit('leave chat', activeChat?._id);
		};
	}, [activeChat, selectedProfile]);

	return (
		<div className={theme === 'dark' ? 'side-bar dark' : 'side-bar'}>
			<div className='header'>
				<div className='user-profile' onClick={handleUserProfileClick}>
					<div className='img-container'>
						<img src={activeUser?.profilePhoto} alt={activeUser?.firstName} />
					</div>
					<h3>@{activeUser?.handle}</h3>
				</div>
				<Stack direction='row' gap={1} marginRight='5px'>
					<NotificationButton className='side-bar-notify' />
					<IconButton className='log-out' onClick={handleLogout}>
						<LogoutIcon fontSize='small' />
					</IconButton>
				</Stack>
			</div>
			<Stack direction='row' gap={1}>
				<button
					className={selectedProfile ? 'option off' : 'option'}
					onClick={handleMatchesClick}
				>
					Matches
				</button>
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
