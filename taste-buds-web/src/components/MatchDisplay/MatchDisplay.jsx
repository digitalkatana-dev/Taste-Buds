import { ButtonBase, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProfile } from '../../redux/slices/appSlice';
import { getChat } from '../../redux/slices/messageSlice';
import './display.scss';

const MatchDisplay = () => {
	const { isMobile } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const matches = user?.matches;

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
				<div key={match?._id} className='user-match-btn-container'>
					<ButtonBase
						className='user-match-btn'
						onClick={() => handleMatchClick(match)}
					>
						<Paper className='match-card' elevation={10}>
							<img src={match.profilePhoto} alt={match.firstName} />
							<h6 className='match-name-mobile'>{match?.firstName}</h6>
						</Paper>
					</ButtonBase>
					<h6 className='match-name'>{match?.firstName}</h6>
				</div>
			))}
		</div>
	);
};

export default MatchDisplay;
