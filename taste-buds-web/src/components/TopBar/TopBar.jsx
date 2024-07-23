import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import lightLogo from '../../assets/logo-light.png';
import darkLogo from '../../assets/logo-dark.png';
import './top-bar.scss';
import Button from '../Button';

const TopBar = ({ page, minimal, setShowDialog }) => {
	const { theme } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
					{!user && !minimal && (
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
					<IconButton className='log-out' onClick={handleLogout}>
						<LogoutIcon fontSize='small' />
					</IconButton>
				)
			)}
		</nav>
	);
};

export default TopBar;
