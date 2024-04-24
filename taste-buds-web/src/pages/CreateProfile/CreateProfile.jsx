import {
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setFirstName,
	setLastName,
	setDOBDay,
	setDOBMonth,
	setDOBYear,
	setGenderIdentity,
	setShowGender,
	setGenderInterest,
	setAboutMe,
	setCity,
	setState,
	setPostalCode,
	setDistancePref,
	setDietType,
	setFavDish,
	createProfile,
	clearErrors,
	clearSuccess,
} from '../../redux/slices/userSlice';
import './create-profile.scss';
import Cropper from 'react-cropper';
import Nav from '../../components/Nav';
import TextInput from '../../components/TextInput';
import TransferList from '../../components/TransferList';
import Button from '../../components/Button';

const CreateProfile = () => {
	const {
		firstName,
		lastName,
		dob,
		genderIdentity,
		showGender,
		genderInterest,
		about,
		location,
		distancePref,
		dietType,
		favorites,
		success,
		errors,
	} = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [cropped, setCropped] = useState(null);
	const cropperRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e, input) => {
		const action_map = {
			first: setFirstName,
			last: setLastName,
			day: setDOBDay,
			month: setDOBMonth,
			year: setDOBYear,
			gid: setGenderIdentity,
			showGen: setShowGender,
			gint: setGenderInterest,
			about: setAboutMe,
			city: setCity,
			state: setState,
			zip: setPostalCode,
			disPref: setDistancePref,
			diet: setDietType,
			favDish: setFavDish,
		};

		const action = action_map[input];

		action &&
			dispatch(action(input === 'showGen' ? e.target.checked : e.target.value));
	};

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		setCropped(cropper.getCroppedCanvas());
	};

	const handleFileChange = (selectedFile) => {
		setFile(selectedFile);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setPreview(null);
			setCropped(null);
		}
	};

	const handleUploadProfilePic = () => {
		cropped.toBlob((blob) => {
			let profilePic = new FormData();
			profilePic.append('file', blob, file.name);
			dispatch();
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			firstName,
			lastName,
			dob,
			genderIdentity,
			showGender,
			genderInterest,
			location,
			distancePref,
			about,
			dietType,
			favorites,
		};
		dispatch(createProfile(data));
	};

	const handleProfileSuccess = useCallback(() => {
		if (success && success === 'Profile created successfully!') {
			navigate('/dashboard');
			setTimeout(() => {
				dispatch(clearSuccess());
				setFile(null);
				setPreview(null);
				setCropped(null);
			}, 2000);
		}
	}, [success, navigate, dispatch]);

	useEffect(() => {
		handleProfileSuccess();
	}, [handleProfileSuccess]);

	return (
		<>
			<Nav minimal />
			<Container>
				<div className='profile-data'>
					<h2>Create Profile</h2>
					<form onSubmit={handleSubmit}>
						<section>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<div className='profile-row'>
									<TextInput
										className='profile-input'
										label='First Name'
										size='small'
										margin='dense'
										value={firstName}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'first')}
										error={errors?.firstName}
									/>
									<TextInput
										className='profile-input'
										label='Last Name'
										size='small'
										margin='dense'
										value={lastName}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'last')}
										error={errors?.lastName}
									/>
								</div>
							</FormControl>
							<FormControl>
								<FormLabel id='birthday-label'>Birthday</FormLabel>
								<div className='profile-row'>
									<TextInput
										className='profile-input'
										type='number'
										label='Day'
										placeholder='DD'
										size='small'
										margin='dense'
										value={dob.day}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'day')}
									/>
									<TextInput
										className='profile-input'
										type='number'
										label='Month'
										placeholder='MM'
										size='small'
										margin='dense'
										value={dob.month}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'month')}
									/>
									<TextInput
										className='profile-input'
										type='number'
										label='Year'
										placeholder='YYYY'
										size='small'
										margin='dense'
										value={dob.year}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'year')}
									/>
								</div>
							</FormControl>
							<FormControl>
								<FormLabel id='gender-identity-label'>
									Gender Identity
								</FormLabel>
								<div className='profile-row alt'>
									<RadioGroup
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
							</FormControl>
							<FormControl>
								<FormControlLabel
									control={
										<Checkbox
											checked={showGender}
											onChange={(e) => handleChange(e, 'showGen')}
										/>
									}
									label='Show gender on my profile'
									labelPlacement='end'
								/>
							</FormControl>
							<FormControl>
								<FormLabel id='gender-interest-label'>
									Gender Interest
								</FormLabel>
								<div className='profile-row alt'>
									<RadioGroup
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
							</FormControl>
							<FormControl>
								<FormLabel id='about-me-label'>About Me</FormLabel>
								<TextInput
									className='profile-input'
									label='About Me'
									size='small'
									margin='dense'
									multiline
									rows={5}
									value={about}
									onFocus={handleFocus}
									onChange={(e) => handleChange(e, 'about')}
								/>
							</FormControl>
							<FormControl>
								<FormLabel id='location-label'>Location</FormLabel>
								<div className='profile-row'>
									<TextInput
										className='profile-input'
										label='City'
										size='small'
										margin='dense'
										value={location.city}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'city')}
									/>
									<TextInput
										className='profile-input'
										label='State'
										size='small'
										margin='dense'
										value={location.state}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'state')}
									/>
									<TextInput
										className='profile-input'
										label='Postal Code'
										size='small'
										margin='dense'
										value={location.postalCode}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'zip')}
									/>
								</div>
							</FormControl>
							<FormControl>
								<FormLabel id='distance-pref-label'>
									Distance Preference
								</FormLabel>
								<div className='profile-row alt'>
									<RadioGroup
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
							</FormControl>
							<FormControl>
								<FormLabel id='diet-type-label'>Diet Type</FormLabel>
								<div className='profile-row-alt'>
									<RadioGroup
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
							</FormControl>
							<FormControl>
								<FormLabel id='favorites-label'>Favorites</FormLabel>
								<FormControl>
									<FormLabel id='fav-foods-label'>Foods Types</FormLabel>
									<TransferList />
								</FormControl>
								<FormControl>
									<FormLabel id='fav-dish-label'>Dish</FormLabel>
									<TextInput
										className='profile-input'
										label='Favorite Dish'
										size='small'
										margin='dense'
										value={favorites.dish}
										onFocus={handleFocus}
										onChange={(e) => handleChange(e, 'favDish')}
										error={errors?.dish}
									/>
								</FormControl>
							</FormControl>
							<Button type='submit' fullWidth>
								Submit
							</Button>
						</section>
						<section>
							<FormControl>
								<FormLabel>Profile Picture</FormLabel>
								<MuiFileInput
									placeholder='Click to choose profile photo'
									size='small'
									margin='dense'
									value={file}
									onChange={handleFileChange}
									fullWidth
								/>
								<div className='image-preview-container'>
									{preview && (
										<Cropper
											src={preview}
											initialAspectRatio={16 / 9}
											guides={false}
											background={false}
											crop={onCrop}
											ref={cropperRef}
										/>
									)}
								</div>
							</FormControl>
						</section>
					</form>
				</div>
			</Container>
		</>
	);
};

export default CreateProfile;
