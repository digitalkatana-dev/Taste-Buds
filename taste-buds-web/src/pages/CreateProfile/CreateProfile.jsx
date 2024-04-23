import { useState } from 'react';
import {
	Checkbox,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
	clearErrors,
} from '../../redux/slices/userSlice';
import './create-profile.scss';
import Nav from '../../components/Nav';
import TextInput from '../../components/TextInput';

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
		errors,
	} = useSelector((state) => state.user);
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
		};

		const action = action_map[input];

		action &&
			dispatch(action(input === 'showGen' ? e.target.checked : e.target.value));
	};

	const handleSubmit = () => {
		console.log('Submit');
	};

	return (
		<>
			<Nav minimal />
			<div className='profile-data'>
				<h2>Create Profile</h2>
				<form onSubmit={handleSubmit}>
					<section>
						<TextInput
							label='First Name'
							size='small'
							margin='dense'
							value={firstName}
							onFocus={handleFocus}
							onChange={(e) => handleChange(e, 'first')}
							error={errors?.firstName}
						/>
						<TextInput
							label='Last Name'
							size='small'
							margin='dense'
							value={lastName}
							onFocus={handleFocus}
							onChange={(e) => handleChange(e, 'last')}
							error={errors?.lastName}
						/>

						<FormControl>
							<FormLabel id='birthday-label'>Birthday</FormLabel>
							<TextInput
								type='number'
								label='Day'
								placeholder='DD'
								size='small'
								margin='dense'
								value={dob.day}
								onChange={(e) => handleChange(e, 'day')}
								onFocus={handleFocus}
							/>
							<TextInput
								type='number'
								label='Month'
								placeholder='MM'
								size='small'
								margin='dense'
								value={dob.month}
								onChange={(e) => handleChange(e, 'month')}
								onFocus={handleFocus}
							/>
							<TextInput
								type='number'
								label='Year'
								placeholder='YYYY'
								size='small'
								margin='dense'
								value={dob.year}
								onChange={(e) => handleChange(e, 'year')}
								onFocus={handleFocus}
							/>
						</FormControl>
						<FormControl>
							<FormLabel id='radio-buttons-group-label'>
								Gender Identity
							</FormLabel>
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
							<FormLabel id='radio-buttons-group-label'>
								Gender Interest
							</FormLabel>
							<RadioGroup
								row
								defaultValue='female'
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
						</FormControl>
						<FormControl>
							<FormLabel id='about-me'>About Me</FormLabel>
							<TextInput
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
							<TextInput
								label='City'
								size='small'
								margin='dense'
								value={location.city}
								onChange={(e) => handleChange(e, 'city')}
								onFocus={handleFocus}
							/>
							<TextInput
								label='State'
								size='small'
								margin='dense'
								value={location.state}
								onChange={(e) => handleChange(e, 'State')}
								onFocus={handleFocus}
							/>
							<TextInput
								label='Postal Code'
								size='small'
								margin='dense'
								value={location.postalCode}
								onChange={(e) => handleChange(e, 'zip')}
								onFocus={handleFocus}
							/>
						</FormControl>
						<FormControl>
							<FormLabel id='distance-radio-buttons-group-label'>
								Distance Preference
							</FormLabel>
							<RadioGroup
								row
								defaultValue='5'
								name='distancePref'
								value={distancePref}
								onChange={(e) => handleChange(e, 'disPref')}
							>
								<FormControlLabel value='5' control={<Radio />} label='5 mi.' />
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
						</FormControl>
					</section>
					<section>Pictures</section>
				</form>
			</div>
		</>
	);
};

export default CreateProfile;
