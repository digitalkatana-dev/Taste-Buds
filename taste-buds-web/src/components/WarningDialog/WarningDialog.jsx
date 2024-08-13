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
import {
	setWarningOpen,
	setWarningType,
	setDeleteData,
} from '../../redux/slices/appSlice';
import { updateBlocked } from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import CloseIcon from '@mui/icons-material/Close';
import './warning.scss';

const WarningDialog = () => {
	const { warningOpen, warningType, deleteData, selectedProfile } = useSelector(
		(state) => state.app
	);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = activeUser?.theme;
	const blocked = activeUser?.blocked;

	const handleClose = () => {
		dispatch(setWarningOpen(false));
		setTimeout(() => {
			if (warningType === 'delete') {
				dispatch(setDeleteData(null));
			}
			dispatch(setWarningType(''));
		}, 2000);
	};

	const handleClick = () => {
		switch (warningType) {
			case 'delete':
				dispatch(deleteData?.action);
				break;

			case 'block':
				const updated = [...blocked, selectedProfile?._id];
				const data = {
					profileId: activeUser._id,
					blocked: updated,
				};

				dispatch(updateBlocked(data));
				break;

			default:
				break;
		}
	};

	return (
		<Dialog
			id='warning-dialog'
			className={theme === 'dark' ? 'dark' : ''}
			maxWidth='xs'
			fullWidth
			open={warningOpen}
			onClose={handleClose}
		>
			<DialogTitle className='title'>
				{capitalizeFirstLetterOfEachWord(warningType)}
			</DialogTitle>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: 8 }}
				className='close'
				onClick={handleClose}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className='content' dividers>
				<DialogContentText>
					{warningType === 'delete' ? (
						<>
							Are you sure you want to delete this {deleteData?.type} forever?
							Warning, this can not be undone!
						</>
					) : (
						warningType === 'block' && (
							<>
								Are you sure you want to block @{selectedProfile?.handle}? If
								so, @{selectedProfile?.handle} will not be able to contact you
								and will not have access to your profile.
							</>
						)
					)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClick}>
					{capitalizeFirstLetterOfEachWord(warningType)}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default WarningDialog;
