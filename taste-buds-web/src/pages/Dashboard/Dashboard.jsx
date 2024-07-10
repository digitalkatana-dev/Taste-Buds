import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenderedBuds, updateMatches } from '../../redux/slices/userSlice';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import ProfileContainer from '../../components/ProfileContainer';
import ButtonRow from '../../components/ButtonRow';

const Dashboard = () => {
	const [lastDirection, setLastDirection] = useState();
	const { user, allUsers } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const swiped = (direction, swippedProfileId) => {
		const matches = user?.matches;
		const areMatched = matches.includes(swippedProfileId);

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

	const handleGetUsers = useCallback(() => {
		dispatch(getGenderedBuds(user?.genderInterest));
	}, [dispatch, user]);

	useEffect(() => {
		handleGetUsers();
	}, [user, handleGetUsers]);

	return (
		<div id='dashboard'>
			<ProfileContainer />
			<div className='swipe-container'>
				<div className='card-container'>
					{allUsers?.map((item) => {
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
			<ButtonRow />
		</div>
	);
};

export default Dashboard;
