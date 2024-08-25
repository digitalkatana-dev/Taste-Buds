import { Chip, Divider, Paper, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setWarningOpen, setWarningType } from '../../redux/slices/appSlice';
import { addOrRemoveMatch, updateBlocked } from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import './user-profile.scss';
import Button from '../Button';

const UserProfile = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const location = useLocation();
	const dispatch = useDispatch();

	const path = location.pathname.split('/')[1];
	const theme = activeUser?.theme;
	const blocked = activeUser?.blocked;

	const blockedCheck = () => {
		return blocked.some((item) => item === selectedProfile?._id);
	};
	const isBlocked = blockedCheck();

	const handleUnmatch = () => {
		const matches = activeUser?.matches;
		const matchCheck = () => {
			return matches.some((match) => match._id === selectedProfile._id);
		};
		const areMatched = matchCheck();

		if (areMatched) {
			dispatch(addOrRemoveMatch(selectedProfile?._id));
		} else {
			return;
		}
	};

	const handleBlock = () => {
		if (isBlocked) {
			const unblocked = blocked?.filter(
				(item) => item !== selectedProfile?._id
			);
			const data = {
				profileId: activeUser._id,
				blocked: unblocked,
			};

			dispatch(updateBlocked(data));
		} else {
			dispatch(setWarningType('block'));
			dispatch(setWarningOpen(true));
		}
	};

	return (
		<div
			id='user-profile'
			className={
				path === 'dashboard'
					? 'dashboard'
					: path === 'selected-profile' && 'selected-profile'
			}
		>
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
					<div className='profile-data-container'>{selectedProfile?.about}</div>
					<Divider>
						<Chip label='Diet' size='small' className='divider-chip' />
					</Divider>
					<div className='profile-data-container'>
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
					<div className='profile-data-container'>
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
					<div className='profile-data-container'>
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
					<div className='fp-photo-container'>
						{selectedProfile?.images?.map((image, i) => (
							<div className='fp-img' key={i}>
								<img src={image} alt='' />
							</div>
						))}
					</div>
					<Divider>
						<Chip label='Block User' size='small' className='divider-chip' />
					</Divider>
					<div className='profile-data-container profile-action'>
						<Button
							size='small'
							className={
								isBlocked ? 'profile-action-btn unblock' : 'profile-action-btn'
							}
							onClick={handleBlock}
						>
							{isBlocked ? 'Unblock' : 'Block'}
						</Button>
					</div>
					<Divider>
						<Chip label='Remove Match' size='small' className='divider-chip' />
					</Divider>
					<div className='profile-data-container profile-action'>
						<Button
							size='small'
							className='profile-action-btn'
							onClick={handleUnmatch}
						>
							Unmatch
						</Button>
					</div>
				</Paper>
			</section>
		</div>
	);
};

export default UserProfile;
