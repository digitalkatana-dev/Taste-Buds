import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	createRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import {
	getGenderedBuds,
	updateMatches,
	clearSuccess,
} from '../../redux/slices/userSlice';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import SideBar from '../../components/SideBar';
import UserProfile from '../../components/UserProfile';
import ButtonRow from '../../components/ButtonRow';

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

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < allUsers?.length - 1;

	const canSwipe = currentIndex >= 0;

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
				<UserProfile />
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
