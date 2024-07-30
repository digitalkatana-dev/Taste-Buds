import {
	Chip,
	Divider,
	FormControlLabel,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/appSlice';
import {
	toggleEditAbout,
	populateAbout,
	setAboutMe,
	toggleEditIdentity,
	populateIdentity,
	setGenderIdentity,
	toggleEditInterest,
	populateInterest,
	setGenderInterest,
	toggleEditLocation,
	populateLocation,
	setCity,
	setState,
	setPostalCode,
	toggleEditDistance,
	populateDistance,
	setDistancePref,
	toggleEditDiet,
	populateDiet,
	setDietType,
	toggleEditFavFoods,
	populateFoods,
	toggleEditFavDish,
	populateDish,
	setFavDish,
	updateProfile,
	clearLocation,
	clearErrors,
} from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import './profile.scss';
import ThemeSwitch from '../../components/ThemeSwitch';
import TextInput from '../../components/TextInput';
import TransferList from '../../components/TransferList';
import Button from '../../components/Button';

const Profile = () => {
	const { theme } = useSelector((state) => state.app);
	const {
		user,
		editAbout,
		about,
		editIdentity,
		genderIdentity,
		editInterest,
		genderInterest,
		editLocation,
		location,
		editDistance,
		distancePref,
		editDiet,
		dietType,
		editFavFoods,
		editFavDish,
		favorites,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSwitchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	const handleEditClick = (section) => {
		const action_map = {
			about: () => {
				dispatch(toggleEditAbout());
				if (editAbout === false) {
					dispatch(populateAbout(user?.about));
				} else if (editAbout === true) {
					dispatch(populateAbout(''));
				}
			},
			identity: () => {
				dispatch(toggleEditIdentity());
				if (editIdentity === false) {
					dispatch(populateIdentity(user?.genderIdentity));
				} else if (editIdentity === true) {
					dispatch(populateIdentity(''));
				}
			},
			interest: () => {
				dispatch(toggleEditInterest());
				if (editInterest === false) {
					dispatch(populateInterest(user?.genderInterest));
				} else if (editInterest === true) {
					dispatch(populateInterest(''));
				}
			},
			location: () => {
				dispatch(toggleEditLocation());
				if (editLocation === false) {
					dispatch(populateLocation(user?.location));
				} else if (editLocation === true) {
					dispatch(clearLocation());
				}
			},
			distance: () => {
				dispatch(toggleEditDistance());
				if (editDistance === false) {
					dispatch(populateDistance(user?.distancePref));
				} else if (editDistance === true) {
					dispatch(populateDistance(null));
				}
			},
			diet: () => {
				dispatch(toggleEditDiet());
				if (editDiet === false) {
					dispatch(populateDiet(user?.dietType));
				} else if (editDiet === true) {
					dispatch(populateDiet(''));
				}
			},
			foods: () => {
				dispatch(toggleEditFavFoods());
				if (editFavFoods === false) {
					dispatch(populateFoods(user?.favorites?.foodTypes));
				} else if (editFavFoods === true) {
					dispatch(populateFoods([]));
				}
			},
			dish: () => {
				dispatch(toggleEditFavDish());
				if (editFavDish === false) {
					dispatch(populateDish(user?.favorites?.dish));
				} else if (editFavDish === true) {
					dispatch(populateDish(''));
				}
			},
		};

		const action = action_map[section];

		action && action();
	};

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e, input) => {
		const action_map = {
			about: setAboutMe,
			gid: setGenderIdentity,
			gint: setGenderInterest,
			city: setCity,
			state: setState,
			zip: setPostalCode,
			disPref: setDistancePref,
			diet: setDietType,
			favDish: setFavDish,
		};

		const action = action_map[input];

		action && dispatch(action(e.target.value));
	};

	const handleSubmit = (e, field) => {
		e.preventDefault();
		let updateData = {
			profileId: user?._id,
		};

		switch (field) {
			case 'about':
				updateData.data = { about };
				break;

			case 'gid':
				updateData.data = { genderIdentity };
				break;

			case 'gint':
				updateData.data = { genderInterest };
				break;

			case 'location':
				updateData.data = { location };
				break;

			case 'distance':
				updateData.data = { distancePref };
				break;

			case 'diet':
				updateData.data = { dietType };
				break;

			case 'foods':
				updateData.data = {
					favorites: {
						...user?.favorites,
						foodTypes: favorites?.foodTypes,
					},
				};
				break;

			case 'dish':
				updateData.data = {
					favorites: {
						...user?.favorites,
						dish: favorites?.dish,
					},
				};
				break;

			default:
				break;
		}

		// if (field === 'about') {
		// 	updateData.data = { about };
		// } else if (field === 'gid') {
		// 	updateData.data = { genderIdentity };
		// } else if (field === 'gint') {
		// 	updateData.data = { genderInterest };
		// } else if (field === 'location') {
		// 	updateData.data = { location };
		// } else if (field === 'distance') {
		// 	updateData.data = { distancePref };
		// } else if (field === 'diet') {
		// 	updateData.data = { dietType };
		// } else if (field === 'foods') {
		// 	updateData.data = {
		// 		favorites: {
		// 			...user?.favorites,
		// 			foodTypes: favorites?.foodTypes,
		// 		},
		// 	};
		// } else if (field === 'dish') {
		// 	updateData.data = {
		// 		favorites: {
		// 			...user?.favorites,
		// 			dish: favorites?.dish,
		// 		},
		// 	};
		// }

		dispatch(updateProfile(updateData));
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
			<div id='profile-content'>
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
						{editAbout ? (
							<form onSubmit={(e) => handleSubmit(e, 'about')}>
								<TextInput
									className={
										theme === 'dark' ? 'profile-input dark' : 'profile-input'
									}
									label='About Me'
									size='small'
									margin='dense'
									multiline
									rows={5}
									fullWidth
									value={about}
									onFocus={handleFocus}
									onChange={(e) => handleChange(e, 'about')}
								/>
								<Button type='type'>Update</Button>
							</form>
						) : (
							<>{user?.about}</>
						)}
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
							<form onSubmit={(e) => handleSubmit(e, 'gid')}>
								<div className='profile-row alt'>
									<RadioGroup
										sx={{ justifyContent: 'center' }}
										row
										defaultValue='female'
										name='genderIdentity'
										value={genderIdentity}
										onChange={(e) => handleChange(e, 'gid')}
									>
										<FormControlLabel
											value='female'
											control={<Radio />}
											label='Female'
										/>
										<FormControlLabel
											value='male'
											control={<Radio />}
											label='Male'
										/>
										<FormControlLabel
											value='non-binary'
											control={<Radio />}
											label='Non-Binary'
										/>
									</RadioGroup>
								</div>
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'gint')}>
								<div className='profile-row alt'>
									<RadioGroup
										sx={{ justifyContent: 'center' }}
										row
										name='genderInterest'
										value={genderInterest}
										onChange={(e) => handleChange(e, 'gint')}
									>
										<FormControlLabel
											value='female'
											control={<Radio />}
											label='Female'
										/>
										<FormControlLabel
											value='male'
											control={<Radio />}
											label='Male'
										/>
										<FormControlLabel
											value='non-binary'
											control={<Radio />}
											label='Non-Binary'
										/>
										<FormControlLabel
											value='everyone'
											control={<Radio />}
											label='Everyone'
										/>
									</RadioGroup>
								</div>
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'location')}>
								<div className='profile-row'>
									<TextInput
										className={
											theme === 'dark' ? 'profile-input dark' : 'profile-input'
										}
										label='City'
										size='small'
										margin='dense'
										value={location.city}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'city')}
									/>
									<TextInput
										className={
											theme === 'dark' ? 'profile-input dark' : 'profile-input'
										}
										label='State'
										size='small'
										margin='dense'
										value={location.state}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'state')}
									/>
									<TextInput
										className={
											theme === 'dark' ? 'profile-input dark' : 'profile-input'
										}
										label='Postal Code'
										size='small'
										margin='dense'
										value={location.postalCode}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'zip')}
									/>
								</div>
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'distance')}>
								<div className='profile-row alt'>
									<RadioGroup
										sx={{ justifyContent: 'center' }}
										row
										defaultValue='5'
										name='distancePref'
										value={distancePref}
										onChange={(e) => handleChange(e, 'disPref')}
									>
										<FormControlLabel
											value='5'
											control={<Radio />}
											label='5 mi.'
										/>
										<FormControlLabel
											value='10'
											control={<Radio />}
											label='10 mi.'
										/>
										<FormControlLabel
											value='25'
											control={<Radio />}
											label='25 mi.'
										/>
									</RadioGroup>
								</div>
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'diet')}>
								<div className='profile-row-alt'>
									<RadioGroup
										sx={{ justifyContent: 'center' }}
										row
										name='dietType'
										value={dietType}
										onChange={(e) => handleChange(e, 'diet')}
									>
										<FormControlLabel
											value='vegan'
											control={<Radio />}
											label='Vegan'
										/>
										<FormControlLabel
											value='paleo'
											control={<Radio />}
											label='Paleo'
										/>
										<FormControlLabel
											value='atkins'
											control={<Radio />}
											label='Atkins'
										/>
										<FormControlLabel
											value='low-carb'
											control={<Radio />}
											label='Low-Carb'
										/>
										<FormControlLabel
											value='carnivore'
											control={<Radio />}
											label='Carnivore'
										/>
										<FormControlLabel
											value='pescatarian'
											control={<Radio />}
											label='Pescatarian'
										/>
										<FormControlLabel
											value='vegetarian'
											control={<Radio />}
											label='Vegetarian'
										/>
										<FormControlLabel
											value='no preference'
											control={<Radio />}
											label='I eat it all!'
										/>
									</RadioGroup>
								</div>
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'foods')}>
								<TransferList isUpdate />
								<Button type='submit'>Update</Button>
							</form>
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
							<form onSubmit={(e) => handleSubmit(e, 'dish')}>
								<TextInput
									className={
										theme === 'dark' ? 'profile-input dark' : 'profile-input'
									}
									label='Favorite Dish'
									size='small'
									margin='dense'
									value={favorites.dish}
									onFocus={handleFocus}
									onChange={(e) => handleChange(e, 'favDish')}
								/>
								<Button type='submit'>Update</Button>
							</form>
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
			</div>
		</div>
	);
};

export default Profile;
