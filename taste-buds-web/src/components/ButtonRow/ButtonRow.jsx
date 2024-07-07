import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import './btnRow.scss';

const ButtonRow = () => {
	return (
		<div id='btn-row'>
			<IconButton className='option-btn reply'>
				<ReplayIcon />
			</IconButton>
			<IconButton className='option-btn close'>
				<CloseIcon />
			</IconButton>
			<IconButton className='option-btn star'>
				<StarRateIcon />
			</IconButton>
			<IconButton className='option-btn fav'>
				<FavoriteIcon />
			</IconButton>
			<IconButton className='option-btn bolt'>
				<BoltIcon />
			</IconButton>
		</div>
	);
};

export default ButtonRow;
