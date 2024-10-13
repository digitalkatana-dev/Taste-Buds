import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfile } from '../../redux/slices/userSlice';
import './btmNav.scss';

const BottomNav = () => {
	const { activeUser } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentLocation = location.pathname.split('/')[1];

	const handleClick = (route) => {
		dispatch(getProfile(activeUser?._id));
		if (route === 'chats') {
			navigate(`/${route}/inbox`);
		} else {
			navigate(`/${route}`);
		}
	};

	return (
		<div id='btm-nav'>
			<IconButton
				className={
					currentLocation === 'dashboard' ? 'nav-btn active' : 'nav-btn'
				}
				onClick={() => handleClick('dashboard')}
			>
				<p className='noto-color-emoji-regular'>🪟</p>
				<h6>Dashboard</h6>
			</IconButton>
			{/* <IconButton
				className={currentLocation === 'search' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('search')}
			>
				<p className='noto-color-emoji-regular'>👀</p>
				<h6>Search</h6>
			</IconButton> */}
			<IconButton
				className={currentLocation === 'matches' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('matches')}
			>
				{activeUser?.genderIdentity === 'male' ? (
					<p className='noto-color-emoji-regular'>🍻</p>
				) : (
					<p className='noto-color-emoji-regular'>🥂</p>
				)}
				<h6>Matches</h6>
			</IconButton>
			<IconButton
				className={currentLocation === 'chats' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('chats')}
			>
				<p className='noto-color-emoji-regular'>💬</p>
				<h6>Chat</h6>
			</IconButton>
			<IconButton
				className={
					currentLocation === 'notifications' ? 'nav-btn active' : 'nav-btn'
				}
				onClick={() => handleClick('notifications')}
			>
				<p className='noto-color-emoji-regular'>🔔</p>
				<h6>Notifications</h6>
			</IconButton>
			<IconButton
				className={currentLocation === 'profile' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('profile')}
			>
				{activeUser?.genderIdentity === 'male' && (
					<p className='noto-color-emoji-regular'>🙋🏽‍♂️</p>
				)}
				{activeUser?.genderIdentity === 'female' && (
					<p className='noto-color-emoji-regular'>🙋🏽‍♀️</p>
				)}
				{activeUser?.genderIdentity === 'non-binary' && (
					<p className='noto-color-emoji-regular'>🙋🏽</p>
				)}
				<h6>My Profile</h6>
			</IconButton>
		</div>
	);
};

export default BottomNav;
