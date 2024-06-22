import { Container } from '@mui/material';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './dashboard.scss';
import ChatContainer from '../../components/ChatContainer';

const db = [
	{
		name: 'Richard Hendricks',
		url: './img/richard.jpg',
	},
	{
		name: 'Erlich Bachman',
		url: 'https://res.cloudinary.com/dk9gbz4ag/image/upload/v1712357804/file_vikl2k.png',
	},
	{
		name: 'Monica Hall',
		url: './img/monica.jpg',
	},
	{
		name: 'Jared Dunn',
		url: './img/jared.jpg',
	},
	{
		name: 'Dinesh Chugtai',
		url: './img/dinesh.jpg',
	},
];

const Dashboard = () => {
	const characters = db;
	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction, nameToDelete) => {
		console.log('removing: ' + nameToDelete);
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + ' left the screen!');
	};

	return (
		<Container id='dashboard' maxWidth='lg'>
			<ChatContainer />
			<div className='swipe-container'>
				<div className='card-container'>
					{characters.map((character) => (
						<TinderCard
							className='swipe'
							key={character.name}
							onSwipe={(dir) => swiped(dir, character.name)}
							onCardLeftScreen={() => outOfFrame(character.name)}
						>
							<div
								style={{ backgroundImage: 'url(' + character.url + ')' }}
								className='card'
							>
								<h3>{character.name}</h3>
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
