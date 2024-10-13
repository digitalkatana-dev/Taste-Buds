import { Avatar, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpened,
	deleteNotification,
} from '../../redux/slices/notificationSlice';
import './notification.scss';
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '../IconButton';

const Notification = ({ data }) => {
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = activeUser.theme;
	let message;

	const markOpen = () => {
		const notificationData = {
			itemId: data._id,
			userId: activeUser._id,
		};

		dispatch(toggleOpened(notificationData));
	};

	const handleDelete = () => {
		const notificationData = {
			itemId: data._id,
			userId: activeUser._id,
		};

		dispatch(deleteNotification(notificationData));
	};

	if (data.notificationType === 'mutalMatch') {
		message = 'You have a match!';
	} else {
		message = '';
	}

	return (
		<MenuItem
			className={
				theme === 'dark' ? 'full-notification dark' : 'full-notification'
			}
			divider
		>
			<div className='notification-info'>
				<Avatar
					src={data.userFrom.profilePhoto}
					className='notification-avatar'
				/>
				{message}
			</div>
			<div className='notification-actions'>
				{data.opened ? (
					<IconButton className='mark-unread' onClick={markOpen}>
						<DraftsIcon />
					</IconButton>
				) : (
					<IconButton className='mark-read' onClick={markOpen}>
						<MarkunreadIcon />
					</IconButton>
				)}
				<IconButton className='delete-notification' onClick={handleDelete}>
					<CloseIcon />
				</IconButton>
			</div>
		</MenuItem>
	);
};

export default Notification;
