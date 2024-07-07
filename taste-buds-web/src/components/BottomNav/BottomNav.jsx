import { IconButton } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import { updateActiveRoute } from '../../redux/slices/appSlice';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import './btmNav.scss';

const BottomNav = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const currentLocation = location.pathname.split('/')[1];

	console.log('Location', location.pathname.split('/')[1]);

	const handleClick = (route) => {
		navigate(`/${route}`);
	};

	return (
		<div id='btm-nav'>
			<IconButton
				className={
					currentLocation === 'dashboard'
						? 'nav-btn reply active'
						: 'nav-btn reply'
				}
				onClick={() => handleClick('dashboard')}
			>
				<ReplayIcon />
			</IconButton>
			<IconButton
				className={
					currentLocation === 'search'
						? 'nav-btn close active'
						: 'nav-btn close'
				}
				onClick={() => handleClick('search')}
			>
				<CloseIcon />
			</IconButton>
			<IconButton
				className={
					currentLocation === 'matches' ? 'nav-btn star active' : 'nav-btn star'
				}
				onClick={() => handleClick('matches')}
			>
				<StarRateIcon />
			</IconButton>
			<IconButton
				className={
					currentLocation === 'chat' ? 'nav-btn fav active' : 'nav-btn fav'
				}
				onClick={() => handleClick('chat')}
			>
				<FavoriteIcon />
			</IconButton>
			<IconButton
				className={
					currentLocation === 'profile' ? 'nav-btn bolt active' : 'nav-btn bolt'
				}
				onClick={() => handleClick('profile')}
			>
				<BoltIcon />
			</IconButton>
		</div>
	);
};

export default BottomNav;
