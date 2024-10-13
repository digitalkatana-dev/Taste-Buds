import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import lightLogo from '../../assets/logo-light.png';
import darkLogo from '../../assets/logo-dark.png';
import './top-bar.scss';
import Button from '../Button';
import NotificationButton from '../NotificationButton';

const TopBar = ({ page, minimal, setShowDialog }) => {
	const { activeUser } = useSelector((state) => state.user);
	const location = useLocation();
	const dispatch = useDispatch();
	const theme = activeUser?.theme;
	const currentLocation = location.pathname.split('/')[1];

	const handleDialog = () => {
		setShowDialog(true);
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<nav id='top-bar' className={page === 'layout' ? 'layout-nav' : ''}>
			<div className='logo-container'>
				{page === 'home' || page === 'create' ? (
					<img className='logo' src={minimal ? darkLogo : lightLogo} alt='' />
				) : (
					page === 'layout' && (
						<img
							className='logo'
							src={theme === 'light' ? darkLogo : lightLogo}
							alt=''
						/>
					)
				)}
			</div>
			{page === 'home' || page === 'create' ? (
				<>
					{!activeUser && !minimal && (
						<Button
							variant='contained'
							className='login-btn'
							onClick={handleDialog}
						>
							Log in
						</Button>
					)}
				</>
			) : (
				page === 'layout' && (
					<Stack direction='row' gap={1}>
						{currentLocation !== 'notifications' && (
							<NotificationButton className='top-bar-notify' />
						)}
						<IconButton className='log-out' onClick={handleLogout}>
							<LogoutIcon fontSize='small' />
						</IconButton>
					</Stack>
				)
			)}
		</nav>
	);
};

export default TopBar;
