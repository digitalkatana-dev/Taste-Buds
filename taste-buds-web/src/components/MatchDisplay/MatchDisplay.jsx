import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { getChat } from '../../redux/slices/messageSlice';
import './display.scss';

const MatchDisplay = () => {
	const { isMobile, theme } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const matches = user?.matches;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const mutualMatches = matches?.filter(
		(match) =>
			match.matches.filter((profile) => profile === user?._id).length > 0
	);

	const handleMatchClick = (profile) => {
		if (!isMobile) {
			dispatch(setSelectedProfile(profile));
			dispatch(getChat(profile._id));
		} else if (isMobile) {
			navigate(`/selected-profile/${profile._id}`);
		}
	};

	return (
		<div id='match-display'>
			{mutualMatches?.map((match) => (
				<div
					key={match?._id}
					className='match-card'
					onClick={() => handleMatchClick(match)}
				>
					<Paper
						className={
							theme === 'dark' ? 'img-container dark' : 'img-container'
						}
						elevation={10}
					>
						<img src={match.profilePhoto} alt={match.firstName} />
					</Paper>
					<h6>{match?.firstName}</h6>
				</div>
			))}
		</div>
	);
};

export default MatchDisplay;
