import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import './selected.scss';

const SelectedProfile = () => {
	const { theme, selectedProfile } = useSelector((state) => state.app);

	return (
		<div id='selected-profile'>
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
