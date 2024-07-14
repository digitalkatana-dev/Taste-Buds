import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './nav-wheel.scss';

const NavWheel = () => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleClick = (route) => {
		if (route === 'chats') {
			navigate(`/${route}/inbox`);
		} else {
			navigate(`/${route}`);
		}
	};

	return (
		<div id='nav-wheel'>
			<IconButton
				className='wheel-btn dash'
				onClick={() => handleClick('dashboard')}
			>
				<p className='noto-color-emoji-regular'>🪟</p>
			</IconButton>
			<IconButton
				className='wheel-btn search'
				onClick={() => handleClick('search')}
			>
				<p className='noto-color-emoji-regular'>👀</p>
			</IconButton>
			<IconButton
				className='wheel-btn match'
				onClick={() => handleClick('matches')}
			>
				{user?.genderIdentity === 'male' ? (
					<p className='noto-color-emoji-regular'>🍻</p>
				) : (
					<p className='noto-color-emoji-regular'>🥂</p>
				)}
			</IconButton>
			<IconButton
				className='wheel-btn chats'
				onClick={() => handleClick('chats')}
			>
				<p className='noto-color-emoji-regular'>💬</p>
			</IconButton>
		</div>
	);
};

export default NavWheel;
