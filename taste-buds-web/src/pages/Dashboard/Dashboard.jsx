import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenderedBuds } from '../../redux/slices/userSlice';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import ChatContainer from '../../components/ChatContainer';

const Dashboard = () => {
	const [lastDirection, setLastDirection] = useState();
	const { user, allUsers } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// const sanitizedUsers = allUsers?.filter((bud) => bud.user !== user.user);

	const swiped = (direction, nameToDelete) => {
		console.log('removing: ' + nameToDelete);
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

	// console.log('Sanitized', sanitizedUsers);

	return (
		<Container id='dashboard' maxWidth='lg'>
			<ChatContainer />
			<div className='swipe-container'>
				<div className='card-container'>
					{allUsers?.map((bud) => (
						<TinderCard
							className='swipe'
							key={bud._id}
							onSwipe={(dir) =>
								swiped(dir, `${bud.firstName + ' ' + bud.lastName}`)
							}
							onCardLeftScreen={() =>
								outOfFrame(`${bud.firstName + ' ' + bud.lastName}`)
							}
						>
							<div
								style={{ backgroundImage: 'url(' + bud.profilePhoto + ')' }}
								className='card'
							>
								<h3>{bud.firstName + ' ' + bud.lastName}</h3>
							</div>
						</TinderCard>
					))}
				</div>
				{lastDirection && (
					<h2 className='info-text'>You swiped {lastDirection}</h2>
				)}
			</div>
		</Container>
	);
};

export default Dashboard;
