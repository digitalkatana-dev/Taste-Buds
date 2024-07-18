import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { getChat } from '../../redux/slices/messageSlice';
import './display.scss';

const MatchDisplay = () => {
	const { user } = useSelector((state) => state.user);
	const matches = user?.matches;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const mutualMatches = matches?.filter(
		(match) =>
			match.matches.filter((profile) => profile === user?._id).length > 0
	);

	const handleMatchClick = (profile) => {
		dispatch(setSelectedProfile(profile));
		dispatch(getChat(profile._id));
		// navigate('/selected-profile');
	};

	return (
		<div id='match-display'>
			{mutualMatches?.map((match) => (
				<div
					key={match?._id}
					className='match-card'
					onClick={() => handleMatchClick(match)}
				>
					<Paper className='img-container' elevation={10}>
						<img src={match.profilePhoto} alt={match.firstName} />
					</Paper>
					<h5>{match?.firstName}</h5>
				</div>
			))}
		</div>
	);
};

export default MatchDisplay;
