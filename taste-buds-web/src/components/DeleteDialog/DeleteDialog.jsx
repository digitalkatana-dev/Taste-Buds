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
import { setDeleteOpen, setDeleteData } from '../../redux/slices/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import './delete.scss';

const DeleteDialog = () => {
	const { deleteOpen, deleteData } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setDeleteOpen(false));
		dispatch(setDeleteData(null));
	};

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(deleteData?.action);
	};

	return (
		<Dialog
			id='delete-dialog'
			maxWidth='xs'
			fullWidth
			open={deleteOpen}
			onClose={handleClose}
		>
			<DialogTitle className='title'>Delete</DialogTitle>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: 8 }}
				className='close'
				onClick={handleClose}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className='content' dividers>
				<DialogContentText>
					Are you sure you want to delete this {deleteData?.type} forever?
					Warning, this can not be undone!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
