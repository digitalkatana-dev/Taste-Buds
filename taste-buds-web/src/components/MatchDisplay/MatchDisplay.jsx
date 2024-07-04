import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import './display.scss';

const MatchDisplay = () => {
	const { user } = useSelector((state) => state.user);
	const { selectedProfile } = useSelector((state) => state.app);
	const matches = user?.matches;
	const dispatch = useDispatch();

	const handleMatchClick = (profile) => {
		if (selectedProfile && profile._id === selectedProfile._id) {
			dispatch(setSelectedProfile(null));
		} else {
			dispatch(setSelectedProfile(profile));
		}
	};

	return (
		<div id='match-display'>
			{matches?.map((match) => (
				<div
					key={match?._id}
					className='match-card'
					onClick={() => handleMatchClick(match)}
				>
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
