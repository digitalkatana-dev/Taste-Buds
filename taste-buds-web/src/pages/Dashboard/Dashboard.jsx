import { Chip, Divider, Paper, Stack } from '@mui/material';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	createRef,
} from 'react';
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
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import SideBar from '../../components/SideBar';
import ButtonRow from '../../components/ButtonRow';
import Button from '../../components/Button';

const Dashboard = () => {
	const { isMobile, selectedProfile } = useSelector((state) => state.app);
	const { activeUser, allUsers, success } = useSelector((state) => state.user);
	const [currentIndex, setCurrentIndex] = useState();
	const [lastDirection, setLastDirection] = useState();
	const currentIndexRef = useRef(currentIndex);
	const childRefs = useMemo(
		() =>
			Array(allUsers?.length)
				.fill(0)
				.map((i) => createRef()),
		[allUsers]
	);
	const dispatch = useDispatch();
	const theme = activeUser?.theme;
	const blocked = activeUser?.blocked;

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < allUsers?.length - 1;

	const canSwipe = currentIndex >= 0;

	const blockedCheck = () => {
		return blocked.some((item) => item === selectedProfile?._id);
	};
	const isBlocked = blockedCheck();

	const swiped = (direction, swippedProfileId, index) => {
		const matches = activeUser?.matches;
		const matchCheck = () => {
			return matches.some((match) => match._id === swippedProfileId);
		};
		const areMatched = matchCheck();

		if (direction === 'right') {
			if (!areMatched) {
				const updatedMatches = [swippedProfileId, ...matches];
				const data = {
					profileId: activeUser._id,
					matches: updatedMatches,
				};
				dispatch(updateMatches(data));
			} else {
				return;
			}
		}
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const outOfFrame = (name, idx) => {
		console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < allUsers?.length) {
			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
		}
	};

	const goBack = async () => {
		if (!canGoBack) return;
		const newIndex = currentIndex + 1;
		updateCurrentIndex(newIndex);
		await childRefs[newIndex].current.restoreCard();
		setLastDirection(undefined);
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

	const handleUnmatch = () => {
		const matches = activeUser?.matches;
		const matchCheck = () => {
			return matches.some((match) => match._id === selectedProfile._id);
		};
		const areMatched = matchCheck();

		if (areMatched) {
			const updatedMatches = matches.filter(
				(item) => item._id !== selectedProfile?._id
			);
			const data = {
				profileId: activeUser._id,
				matches: updatedMatches,
			};

			dispatch(updateMatches(data));
		} else {
			return;
		}
	};

	const handleGetUsers = useCallback(() => {
		dispatch(getGenderedBuds(activeUser?.genderInterest));
	}, [dispatch, activeUser]);

	const handleSuccess = useCallback(() => {
		if (success) {
			if (success === 'Gendered retrieved successfully!') {
				setCurrentIndex(allUsers?.length - 1);
			} else if (success === 'Matches updated successfully!') {
				dispatch(setSelectedProfile(null));
			}

			setTimeout(() => {
				dispatch(clearSuccess());
			}, 2000);
		}
	}, [dispatch, success, allUsers]);

	useEffect(() => {
		handleGetUsers();
	}, [handleGetUsers]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

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
						{allUsers?.map((item, index) => {
							const name = `${item.firstName} ${item.lastName}`;
							const favFoodTypes = item.favorites.foodTypes;
							const favDish = item.favorites.dish;

							return (
								<TinderCard
									ref={childRefs[index]}
									className='swipe'
									key={item._id}
									onSwipe={(dir) => swiped(dir, item._id, index)}
									onCardLeftScreen={() => outOfFrame(item.firstName, index)}
									preventSwipe={['up', 'down']}
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
			<ButtonRow
				swipeLeft={() => swipe('left')}
				undo={() => goBack()}
				swipeRight={() => swipe('right')}
				lastDirection={lastDirection}
			/>
		</div>
	);
};

export default Dashboard;
