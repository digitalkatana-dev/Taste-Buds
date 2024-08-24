import { Badge, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './notification-btn.scss';

const NotificationButton = ({ className }) => {
	const { unopened } = useSelector((state) => state.notification);
	return (
		<IconButton className={className}>
			<Badge badgeContent={unopened.length}>
				<NotificationsIcon fontSize='small' />
			</Badge>
		</IconButton>
	);
};

export default NotificationButton;
