import { useDispatch, useSelector } from 'react-redux';
import './display.scss';

const MatchDisplay = () => {
	const { user } = useSelector((state) => state.user);
	const matches = user?.matches;

	return (
		<div id='match-display'>
			{matches?.map((match) => (
				<div key={match?._id} className='match-card'>
					<div className='img-container'>
						<img src={match.profilePhoto} alt={match.firstName} />
					</div>
					<h5>{match?.firstName}</h5>
				</div>
			))}
		</div>
	);
};

export default MatchDisplay;
