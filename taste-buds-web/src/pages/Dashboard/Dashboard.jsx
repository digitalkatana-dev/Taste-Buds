import { Chip, Divider, Paper, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setWarningType,
	setWarningOpen,
	setSelectedProfile,
} from '../../redux/slices/appSlice';
import {
	getGenderedBuds,
	updateMatches,
	updateBlocked,
	clearSuccess,
} from '../../redux/slices/userSlice';
import {
	shuffleArray,
	capitalizeFirstLetterOfEachWord,
} from '../../util/helpers';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import SideBar from '../../components/SideBar';
import ButtonRow from '../../components/ButtonRow';
import Button from '../../components/Button';

const Dashboard = () => {
	const { isMobile, selectedProfile } = useSelector((state) => state.app);
	const { user, allUsers, success } = useSelector((state) => state.user);
	const [lastDirection, setLastDirection] = useState();
	const dispatch = useDispatch();
	const theme = user?.theme;
	const blocked = user?.blocked;

	const blockedCheck = () => {
		return blocked.some((item) => item === selectedProfile?._id);
	};
	const isBlocked = blockedCheck();

	const potentialMatches = shuffleArray(allUsers);

	const swiped = (direction, swippedProfileId) => {
		const matches = user?.matches;
		const matchCheck = () => {
			return matches.some((match) => match._id === swippedProfileId);
		};
		const areMatched = matchCheck();

		if (direction === 'right') {
			if (!areMatched) {
				const updatedMatches = [swippedProfileId, ...matches];
				const data = {
					profileId: user._id,
					matches: updatedMatches,
				};
				dispatch(updateMatches(data));
			} else {
				return;
			}
		}
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + ' left the screen!');
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
			dispatch(setWarningType('block'));
			dispatch(setWarningOpen(true));
		}
	};

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

	const handleGetUsers = useCallback(() => {
		dispatch(getGenderedBuds(user?.genderInterest));
	}, [dispatch, user]);

	const handleUnmatchSuccess = useCallback(() => {
		if (success) {
			if (success === 'Matches updated successfully!') {
				dispatch(setSelectedProfile(null));
			}

			setTimeout(() => {
				dispatch(clearSuccess());
			}, 2000);
		}
	}, [dispatch, success]);

	useEffect(() => {
		handleGetUsers();
	}, [user, handleGetUsers]);

	useEffect(() => {
		handleUnmatchSuccess();
	}, [handleUnmatchSuccess]);

	return (
		<div id='dashboard'>
			<SideBar />
			{!isMobile && selectedProfile ? (
				<div className='selected-profile'>
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
							className={
								theme === 'dark' ? 'profile-paper dark' : 'profile-paper'
							}
							elevation={10}
						>
							<Divider>
								<Chip label='About' size='small' className='divider-chip' />
							</Divider>
							<div className='profile-data-container'>
								{selectedProfile?.about}
							</div>
							<Divider>
								<Chip label='Diet' size='small' className='divider-chip' />
							</Divider>
							<div className='profile-data-container'>
								<Chip
									label={capitalizeFirstLetterOfEachWord(
										selectedProfile?.dietType
									)}
									size='small'
									variant={theme === 'dark' ? 'outlined' : 'filled'}
									className='data-chip'
								/>
							</div>
							<Divider>
								<Chip
									label='Food Types'
									size='small'
									className='divider-chip'
								/>
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
								<Chip
									label='Block User'
									size='small'
									className='divider-chip'
								/>
							</Divider>
							<div className='profile-data-container profile-action'>
								<Button
									size='small'
									className={
										isBlocked
											? 'profile-action-btn unblock'
											: 'profile-action-btn'
									}
									onClick={handleBlock}
								>
									{isBlocked ? 'Unblock' : 'Block'}
								</Button>
							</div>
							<Divider>
								<Chip
									label='Remove Match'
									size='small'
									className='divider-chip'
								/>
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
			) : (
				<div className='swipe-container'>
					<div className='card-container'>
						{potentialMatches?.map((item) => {
							const name = `${item.firstName} ${item.lastName}`;
							const favFoodTypes = item.favorites.foodTypes;
							const favDish = item.favorites.dish;

							return (
								<TinderCard
									className='swipe'
									key={item._id}
									onSwipe={(dir) => swiped(dir, item._id)}
									onCardLeftScreen={() => outOfFrame(item.firstName)}
								>
									<div className='card'>
										<img src={item.profilePhoto} alt={name} />
										<div className='card-overlay'>
											<h3>{name}</h3>
											<div className='food-type-block'>
												{favFoodTypes.map((type) => (
													<h3 key={favFoodTypes.indexOf(type)}>{type}</h3>
												))}
											</div>
											<h3>Favorite Dish: {favDish}</h3>
										</div>
									</div>
								</TinderCard>
							);
						})}
					</div>
					{lastDirection && (
						<h2 className='info-text'>You swiped {lastDirection}</h2>
					)}
				</div>
			)}
			<ButtonRow />
		</div>
	);
};

export default Dashboard;
