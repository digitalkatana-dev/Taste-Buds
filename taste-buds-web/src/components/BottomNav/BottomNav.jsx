import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './btmNav.scss';

const BottomNav = () => {
	const { user } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();
	const currentLocation = location.pathname.split('/')[1];

	const handleClick = (route) => {
		navigate(`/${route}`);
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
			</IconButton>
			<IconButton
				className={currentLocation === 'search' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('search')}
			>
				<p className='noto-color-emoji-regular'>👀</p>
			</IconButton>
			<IconButton
				className={currentLocation === 'matches' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('matches')}
			>
				{user?.genderIdentity === 'male' ? (
					<p className='noto-color-emoji-regular'>🍻</p>
				) : (
					<p className='noto-color-emoji-regular'>🥂</p>
				)}
			</IconButton>
			<IconButton
				className={currentLocation === 'chats' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('chats')}
			>
				<p className='noto-color-emoji-regular'>💬</p>
			</IconButton>
			<IconButton
				className={currentLocation === 'profile' ? 'nav-btn active' : 'nav-btn'}
				onClick={() => handleClick('profile')}
			>
				{user?.genderIdentity === 'male' && (
					<p className='noto-color-emoji-regular'>🙋🏽‍♂️</p>
				)}
				{user?.genderIdentity === 'female' && (
					<p className='noto-color-emoji-regular'>🙋🏽‍♀️</p>
				)}
				{user?.genderIdentity === 'non-binary' && (
					<p className='noto-color-emoji-regular'>🙋🏽</p>
				)}
			</IconButton>
		</div>
	);
};

export default BottomNav;
