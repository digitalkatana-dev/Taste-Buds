import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { getConversation } from '../../redux/slices/messageSlice';
import './display.scss';

const MatchDisplay = () => {
	const { user } = useSelector((state) => state.user);
	const matches = user?.matches;
	const dispatch = useDispatch();

	const handleMatchClick = (profile) => {
		const data = {
			sender: user?._id,
			recipient: profile?._id,
		};
		dispatch(setSelectedProfile(profile));
		dispatch(getConversation(data));
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
