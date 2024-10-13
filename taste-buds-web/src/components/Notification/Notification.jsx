import { Avatar, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpened } from '../../redux/slices/notificationSlice';
import './notification.scss';

const Notification = ({ key, data }) => {
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

	if (data.notificationType === 'mutalMatch') {
		message = 'You have a match!';
	} else {
		message = '';
	}

	return (
		<MenuItem
			key={key}
			onClick={markOpen}
			className={
				theme === 'dark' ? 'notification-item dark' : 'notification-item'
			}
		>
			<Avatar
				src={data.userFrom.profilePhoto}
				className='notification-avatar'
			/>{' '}
			{message}
		</MenuItem>
	);
};

export default Notification;
