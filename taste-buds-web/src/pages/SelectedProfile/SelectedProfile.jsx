import { Chip, Divider, Paper, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getSelectedProfile,
	setSelectedProfile,
	setBlockOpen,
} from '../../redux/slices/appSlice';
import {
	updateMatches,
	updateBlocked,
	clearSuccess,
} from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import './selected.scss';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

const SelectedProfile = () => {
	const { loading, selectedProfile } = useSelector((state) => state.app);
	const { user, success } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const profile = location.pathname.split('/')[2];
	const theme = user?.theme;
	const blocked = user?.blocked;

	const blockedCheck = () => {
		return blocked.some((item) => item === selectedProfile?._id);
	};
	const isBlocked = blockedCheck();

	const handleUnmatch = () => {
		const matches = user?.matches;
		const matchCheck = () => {
			return matches.some((match) => match._id === selectedProfile._id);
		};
		const areMatched = matchCheck();

		if (areMatched) {
			const updatedMatches = matches.filter(
				(item) => item._id !== selectedProfile?._id
			);
			const data = {
				profileId: user._id,
				matches: updatedMatches,
			};

			dispatch(updateMatches(data));
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
				profileId: user._id,
				blocked: unblocked,
			};

			dispatch(updateBlocked(data));
		} else {
			dispatch(setBlockOpen(true));
		}
	};

	const loadSelectedProfile = useCallback(() => {
		dispatch(getSelectedProfile(profile));
	}, [dispatch, profile]);

	const clearSelectedProfile = useCallback(() => {
		dispatch(setSelectedProfile(null));
	}, [dispatch]);

	const handleUnmatchSuccess = useCallback(() => {
		if (success) {
			if (success === 'Matches updated successfully!') {
				navigate('/matches');
			}

			setTimeout(() => {
				dispatch(clearSuccess());
			}, 2000);
		}
	}, [navigate, dispatch, success]);

	useEffect(() => {
		loadSelectedProfile();

		return () => {
			clearSelectedProfile();
		};
	}, [loadSelectedProfile, clearSelectedProfile]);

	useEffect(() => {
		handleUnmatchSuccess();
	}, [handleUnmatchSuccess]);

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
							className='profile-action-btn block'
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
							className='profile-action-btn unmatch'
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

export default SelectedProfile;
