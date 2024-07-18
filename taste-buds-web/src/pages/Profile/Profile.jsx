import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/appSlice';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import './profile.scss';
import ThemeSwitch from '../../components/ThemeSwitch';
import NavWheel from '../../components/NavWheel';

const Profile = () => {
	const { theme } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSwitchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	return (
		<div id='profile'>
			<div className='header-container'>
				<div className='cover-photo-section'>
					<div className='cover-photo-container'>
						{user?.coverPhoto && <img src={user?.coverPhoto} alt='cover' />}
						<IconButton className='cover-photo-btn'>
							<PhotoCameraOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
				</div>
			</div>
			<section id='profile-content'>
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='center'
					gap={1}
					className='user-container'
				>
					<div className='profile-photo-container'>
						<img src={user?.profilePhoto} alt={user?.handle} />
						<IconButton className='profile-photo-btn'>
							<PhotoCameraOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
					<Stack direction='column' alignItems='center'>
						<span className='full-name'>
							{user?.firstName + ' ' + user?.lastName}
						</span>
						<span className='handle'>@{user?.handle}</span>
						<span className='desc'></span>
					</Stack>
				</Stack>
				<Paper
					className={theme === 'dark' ? 'profile-paper dark' : 'profile-paper'}
					elevation={10}
				>
					<div className='greeting-container'>
						<h3 className='greeting'>Hi {user?.firstName}, Welcome back 👋</h3>
						<Stack direction='row' alignItems='center'>
							<Typography>Light</Typography>
							<ThemeSwitch
								checked={theme === 'light' ? false : true}
								onChange={handleSwitchTheme}
							/>
							<Typography>Dark</Typography>
						</Stack>
					</div>
					{/* <NavWheel /> */}
				</Paper>
			</section>
		</div>
	);
};

export default Profile;
