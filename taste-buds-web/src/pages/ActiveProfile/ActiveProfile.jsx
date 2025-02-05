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
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPhotoOpen,
	setPhotoDialogType,
	setWarningType,
	setWarningOpen,
	setDeleteData,
} from '../../redux/slices/appSlice';
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
	updateUserProfile,
	manageFoodPorn,
	deleteAccount,
	clearLocation,
	clearErrors,
} from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import './active-profile.scss';
import ThemeSwitch from '../../components/ThemeSwitch';
import TextInput from '../../components/TextInput';
import TransferList from '../../components/TransferList';
import Button from '../../components/Button';

const ActiveProfile = () => {
	const { photoDialogType } = useSelector((state) => state.app);
	const {
		activeUser,
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
		photoPreview,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = activeUser?.theme;

	const handleSwitchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		const updateData = {
			profileId: activeUser?._id,
			theme: newTheme,
		};

		dispatch(updateUserProfile(updateData));
	};

	const handleEditClick = (section) => {
		const action_map = {
			about: () => {
				dispatch(toggleEditAbout());
				if (editAbout === false) {
					dispatch(populateAbout(activeUser?.about));
				} else if (editAbout === true) {
					dispatch(populateAbout(''));
				}
			},
			identity: () => {
				dispatch(toggleEditIdentity());
				if (editIdentity === false) {
					dispatch(populateIdentity(activeUser?.genderIdentity));
				} else if (editIdentity === true) {
					dispatch(populateIdentity(''));
				}
			},
			interest: () => {
				dispatch(toggleEditInterest());
				if (editInterest === false) {
					dispatch(populateInterest(activeUser?.genderInterest));
				} else if (editInterest === true) {
					dispatch(populateInterest(''));
				}
			},
			location: () => {
				dispatch(toggleEditLocation());
				if (editLocation === false) {
					dispatch(populateLocation(activeUser?.location));
				} else if (editLocation === true) {
					dispatch(clearLocation());
				}
			},
			distance: () => {
				dispatch(toggleEditDistance());
				if (editDistance === false) {
					dispatch(populateDistance(activeUser?.distancePref));
				} else if (editDistance === true) {
					dispatch(populateDistance(null));
				}
			},
			diet: () => {
				dispatch(toggleEditDiet());
				if (editDiet === false) {
					dispatch(populateDiet(activeUser?.dietType));
				} else if (editDiet === true) {
					dispatch(populateDiet(''));
				}
			},
			foods: () => {
				dispatch(toggleEditFavFoods());
				if (editFavFoods === false) {
					dispatch(populateFoods(activeUser?.favorites?.foodTypes));
				} else if (editFavFoods === true) {
					dispatch(populateFoods([]));
				}
			},
			dish: () => {
				dispatch(toggleEditFavDish());
				if (editFavDish === false) {
					dispatch(populateDish(activeUser?.favorites?.dish));
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

	const handleUploadClick = () => {
		dispatch(setPhotoOpen(true));
		dispatch(setPhotoDialogType('food porn'));
	};

	const handleSubmit = (e, field) => {
		e.preventDefault();
		let updateData = {
			profileId: activeUser?._id,
		};

		switch (field) {
			case 'about':
				updateData.about = about;
				break;

			case 'gid':
				updateData.genderIdentity = genderIdentity;
				break;

			case 'gint':
				updateData.genderInterest = genderInterest;
				break;

			case 'location':
				updateData.location = location;
				break;

			case 'distance':
				updateData.distancePref = distancePref;
				break;

			case 'diet':
				updateData.dietType = dietType;
				break;

			case 'foods':
				updateData.favorites = {
					...activeUser?.favorites,
					foodTypes: favorites?.foodTypes,
				};
				break;

			case 'dish':
				updateData.favorites = {
					...activeUser?.favorites,
					dish: favorites?.dish,
				};
				break;

			default:
				break;
		}

		dispatch(updateUserProfile(updateData));
	};

	const handleDeleteFoodPorn = (imageUrl) => {
		const data = new FormData();
		data.append('profileId', activeUser?._id);
		data.append('url', imageUrl);

		dispatch(manageFoodPorn(data));
	};

	const handleDeleteClick = () => {
		const data = {
			type: 'account',
			action: deleteAccount(activeUser?._id),
		};

		dispatch(setWarningType('delete'));
		dispatch(setDeleteData(data));
		dispatch(setWarningOpen(true));
	};

	const handleFoodPornUpload = useCallback(() => {
		if (photoPreview && photoDialogType === 'food porn') {
			const data = new FormData();
			data.append('profileId', activeUser?._id);
			data.append('b64str', photoPreview);

			dispatch(manageFoodPorn(data));
		}
	}, [dispatch, activeUser, photoPreview, photoDialogType]);

	useEffect(() => {
		handleFoodPornUpload();
	}, [handleFoodPornUpload]);

	return (
		<div id='active-profile'>
			<div className='header-container'>
				<div className='cover-photo-section'>
					<div className='cover-photo-container'>
						{activeUser?.coverPhoto && (
							<img src={activeUser?.coverPhoto} alt='cover' />
						)}
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
						<img src={activeUser?.profilePhoto} alt={activeUser?.handle} />
						<IconButton className='profile-photo-btn'>
							<PhotoCameraOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
					<Stack direction='column' alignItems='center'>
						<span className='full-name'>
							{activeUser?.firstName + ' ' + activeUser?.lastName}
						</span>
						<span className='handle'>@{activeUser?.handle}</span>
						<span className='desc'></span>
					</Stack>
				</Stack>
				<Paper
					className={theme === 'dark' ? 'profile-paper dark' : 'profile-paper'}
					elevation={10}
				>
					<div className='greeting-container'>
						<h3 className='greeting'>
							Hi {activeUser?.firstName}, Welcome back 👋
						</h3>
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
							<>{activeUser?.about}</>
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
								label={capitalizeFirstLetterOfEachWord(
									activeUser?.genderIdentity
								)}
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
								label={capitalizeFirstLetterOfEachWord(
									activeUser?.genderInterest
								)}
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
								label={`${activeUser?.location?.city}, ${activeUser?.location?.state} ${activeUser?.location?.postalCode}`}
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
								label={`${activeUser?.distancePref} mi.`}
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
								label={capitalizeFirstLetterOfEachWord(activeUser?.dietType)}
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
								{activeUser?.favorites?.foodTypes?.map((item, i) => (
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
								label={activeUser?.favorites?.dish}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						)}
					</div>
					<Divider>
						<Chip label='Food Porn' size='small' className='divider-chip' />
					</Divider>
					<button className='edit-btn' onClick={handleUploadClick}>
						UPLOAD
					</button>
					<div className='fp-photo-container'>
						{activeUser?.images?.map((image, i) => (
							<div className='fp-img' key={i}>
								<IconButton
									sx={{ position: 'absolute', top: 2, right: 2 }}
									className='del-photo-btn'
									onClick={() => handleDeleteFoodPorn(image)}
								>
									<DeleteIcon className='delete-icon' fontSize='small' />
								</IconButton>
								<img src={image} alt='' />
							</div>
						))}
					</div>
					<Divider>
						<Chip
							label='Delete Account'
							size='small'
							className='divider-chip'
						/>
					</Divider>
					<div className='profile-data-container profile-action'>
						<Button
							size='small'
							className='profile-action-btn'
							onClick={handleDeleteClick}
						>
							Delete Account
						</Button>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default ActiveProfile;
