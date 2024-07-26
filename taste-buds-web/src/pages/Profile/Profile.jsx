import {
	Chip,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/appSlice';
import {
	toggleEditIdentity,
	toggleEditInterest,
	toggleEditAbout,
	toggleEditLocation,
	toggleEditDistance,
	toggleEditDiet,
	toggleEditFavFoods,
	toggleEditFavDish,
} from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import './profile.scss';
import ThemeSwitch from '../../components/ThemeSwitch';

const Profile = () => {
	const { theme } = useSelector((state) => state.app);
	const {
		user,
		editIdentity,
		editInterest,
		editAbout,
		editLocation,
		editDistance,
		editDiet,
		editFavFoods,
		editFavDish,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSwitchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	const handleEditClick = (section) => {
		const action_map = {
			about: toggleEditAbout,
			identity: toggleEditIdentity,
			interest: toggleEditInterest,
			location: toggleEditLocation,
			distance: toggleEditDistance,
			diet: toggleEditDiet,
			foods: toggleEditFavFoods,
			dish: toggleEditFavDish,
		};

		const action = action_map[section];

		action && dispatch(action());
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
					<Divider>
						<Chip label='About' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn' onClick={() => handleEditClick('about')}>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editAbout ? <></> : <>{user?.about}</>}
					</div>
					<Divider>
						<Chip
							label='Gender Identity'
							size='small'
							className='divider-chip'
						/>
					</Divider>
					<button
						className='edit-btn'
						onClick={() => handleEditClick('identity')}
					>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editIdentity ? (
							<></>
						) : (
							<Chip
								label={capitalizeFirstLetterOfEachWord(user?.genderIdentity)}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip
							label='Gender Interest'
							size='small'
							className='divider-chip'
						/>
					</Divider>
					<button
						className='edit-btn'
						onClick={() => handleEditClick('interest')}
					>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editInterest ? (
							<></>
						) : (
							<Chip
								label={capitalizeFirstLetterOfEachWord(user?.genderInterest)}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip label='Location' size='small' className='divider-chip' />
					</Divider>
					<button
						className='edit-btn'
						onClick={() => handleEditClick('location')}
					>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editLocation ? (
							<></>
						) : (
							<Chip
								label={`${user?.location?.city}, ${user?.location?.state} ${user?.location?.postalCode}`}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip
							label='Distance Preference'
							size='small'
							className='divider-chip'
						/>
					</Divider>
					<button
						className='edit-btn'
						onClick={() => handleEditClick('distance')}
					>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editDistance ? (
							<></>
						) : (
							<Chip
								label={`${user?.distancePref} mi.`}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip label='Diet' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn' onClick={() => handleEditClick('diet')}>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editDiet ? (
							<></>
						) : (
							<Chip
								label={capitalizeFirstLetterOfEachWord(user?.dietType)}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip label='Food Types' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn' onClick={() => handleEditClick('foods')}>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editFavFoods ? (
							<></>
						) : (
							<>
								{user?.favorites?.foodTypes?.map((item, i) => (
									<Chip
										key={i}
										label={item}
										size='small'
										variant={theme === 'dark' ? 'outlined' : 'filled'}
										className='data-chip'
									/>
								))}
							</>
						)}
					</div>
					<Divider>
						<Chip label='Fav Dish' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn' onClick={() => handleEditClick('dish')}>
						EDIT
					</button>
					<div className='profile-data-container'>
						{editFavDish ? (
							<></>
						) : (
							<Chip
								label={user?.favorites?.dish}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip label='Food Porn' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn'>UPLOAD</button>
					<div className='photo-container'></div>
				</Paper>
			</section>
		</div>
	);
};

export default Profile;
