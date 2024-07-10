import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import lightLogo from '../../assets/logo-light.png';
import darkLogo from '../../assets/logo-dark.png';
import './top-bar.scss';

const TopBar = () => {
	const { theme } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div id='top-bar'>
			<div className='logo-container'>
				<img
					className='logo'
					src={theme === 'light' ? darkLogo : lightLogo}
					alt=''
				/>
			</div>
			<IconButton className='log-out' onClick={handleLogout}>
				<LogoutIcon fontSize='small' />
			</IconButton>
		</div>
	);
};

export default TopBar;
