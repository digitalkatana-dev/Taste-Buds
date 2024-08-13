import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './btnRow.scss';

const ButtonRow = ({ swipeRight, undo, swipeLeft, lastDirection }) => {
	return (
		<div id='btn-row'>
			<IconButton className='option-btn close' onClick={swipeLeft}>
				<CloseIcon />
			</IconButton>
			<IconButton
				className='option-btn reply'
				onClick={undo}
				disabled={lastDirection !== 'left'}
			>
				<ReplayIcon />
			</IconButton>
			<IconButton className='option-btn fav' onClick={swipeRight}>
				<FavoriteIcon />
			</IconButton>
		</div>
	);
};

export default ButtonRow;
