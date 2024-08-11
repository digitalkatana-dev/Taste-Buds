import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBlockOpen } from '../../redux/slices/appSlice';
import { updateBlocked } from '../../redux/slices/userSlice';
import CloseIcon from '@mui/icons-material/Close';
import './block.scss';

const BlockDialog = () => {
	const { blockOpen, selectedProfile } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = user?.theme;

	const handleClose = () => {
		dispatch(setBlockOpen(false));
	};

	const handleClick = () => {
		const blocked = user?.blocked;
		const updated = [...blocked, selectedProfile?._id];
		const data = {
			profileId: user._id,
			blocked: updated,
		};

		dispatch(updateBlocked(data));
	};

	return (
		<Dialog
			id='block-dialog'
			className={theme === 'dark' ? 'dark' : ''}
			maxWidth='xs'
			fullWidth
			open={blockOpen}
			onClose={handleClose}
		>
			<DialogTitle className='title'>Block User</DialogTitle>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: 8 }}
				className='close'
				onClick={handleClose}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className='content' dividers>
				<DialogContentText>
					Are you sure you want to block @{selectedProfile?.handle}? If so, @
					{selectedProfile?.handle} will not be able to contact you and will not
					have access to your profile.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClick}>Block</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BlockDialog;
