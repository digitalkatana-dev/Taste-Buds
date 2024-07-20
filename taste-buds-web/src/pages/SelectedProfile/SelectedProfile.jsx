import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	getSelectedProfile,
	setSelectedProfile,
} from '../../redux/slices/appSlice';
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

	console.log('URL', profile);

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
						<span className='desc'>{selectedProfile?.about}</span>
					</Stack>
				</Stack>
				<Paper
					className={theme === 'dark' ? 'profile-paper dark' : 'profile-paper'}
					elevation={10}
				>
					<div className='greeting-container'>
						<h3 className='greeting'>
							Hi {selectedProfile?.firstName}, Welcome back 👋
						</h3>
					</div>
				</Paper>
			</section>
		</div>
	);
};

export default SelectedProfile;
