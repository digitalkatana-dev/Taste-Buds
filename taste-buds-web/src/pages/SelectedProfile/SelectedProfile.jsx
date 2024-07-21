import { Chip, Divider, Paper, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	getSelectedProfile,
	setSelectedProfile,
} from '../../redux/slices/appSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import './selected.scss';
import Loading from '../../components/Loading';

const SelectedProfile = () => {
	const { loading, theme, selectedProfile } = useSelector((state) => state.app);
	const location = useLocation();
	const dispatch = useDispatch();

	const profile = location.pathname.split('/')[2];

	const loadSelectedProfile = useCallback(() => {
		dispatch(getSelectedProfile(profile));
	}, [dispatch, profile]);

	const clearSelectedProfile = useCallback(() => {
		dispatch(setSelectedProfile(null));
	}, [dispatch]);

	useEffect(() => {
		loadSelectedProfile();

		return () => {
			clearSelectedProfile();
		};
	}, [loadSelectedProfile, clearSelectedProfile]);

	return (
		<div id='selected-profile'>
			{loading && <Loading />}
			<div className='header-container'>
				<div className='cover-photo-section'>
					<div className='cover-photo-container'>
						{selectedProfile?.coverPhoto && (
							<img src={selectedProfile?.coverPhoto} alt='cover' />
						)}
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
						<img
							src={selectedProfile?.profilePhoto}
							alt={selectedProfile?.handle}
						/>
					</div>
					<Stack direction='column' alignItems='center'>
						<span className='full-name'>
							{selectedProfile?.firstName + ' ' + selectedProfile?.lastName}
						</span>
						<span className='handle'>@{selectedProfile?.handle}</span>
					</Stack>
				</Stack>
				<Paper
					className={theme === 'dark' ? 'profile-paper dark' : 'profile-paper'}
					elevation={10}
				>
					<Divider>
						<Chip label='About' size='small' className='divider-chip' />
					</Divider>
					<div className='about-container'>{selectedProfile?.about}</div>
					<Divider>
						<Chip label='Diet' size='small' className='divider-chip' />
					</Divider>
					<div className='diet-container'>
						<Chip
							label={capitalizeFirstLetterOfEachWord(selectedProfile?.dietType)}
							size='small'
							variant={theme === 'dark' ? 'outlined' : 'filled'}
							className='data-chip'
						/>
					</div>
					<Divider>
						<Chip label='Food Types' size='small' className='divider-chip' />
					</Divider>
					<div className='food-type-container'>
						{selectedProfile?.favorites?.foodTypes?.map((item, i) => (
							<Chip
								key={i}
								label={item}
								size='small'
								variant={theme === 'dark' ? 'outlined' : 'filled'}
								className='data-chip'
							/>
						))}
					</div>
					<Divider>
						<Chip label='Fav Dish' size='small' className='divider-chip' />
					</Divider>
					<div className='dish-container'>
						<Chip
							label={selectedProfile?.favorites?.dish}
							size='small'
							variant={theme === 'dark' ? 'outlined' : 'filled'}
							className='data-chip'
						/>
					</div>
					<Divider>
						<Chip label='Food Porn' size='small' className='divider-chip' />
					</Divider>
					<div className='photo-container'></div>
					<Divider>
						<Chip label='Remove Match' size='small' className='divider-chip' />
					</Divider>
					<div className='unmatch-container'></div>
				</Paper>
			</section>
		</div>
	);
};

export default SelectedProfile;
