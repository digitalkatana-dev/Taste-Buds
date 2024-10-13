import { Avatar, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpened } from '../../redux/slices/notificationSlice';
import './mini.scss';

const MiniNotification = ({ data }) => {
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
			onClick={markOpen}
			className={
				theme === 'dark' ? 'mini-notification dark' : 'mini-notification'
			}
			divider
		>
			<Avatar
				src={data.userFrom.profilePhoto}
				className='notification-avatar'
			/>
			{message}
		</MenuItem>
	);
};

export default MiniNotification;
