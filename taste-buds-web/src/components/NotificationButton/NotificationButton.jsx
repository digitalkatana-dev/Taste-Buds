import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './notification-btn.scss';

const NotificationButton = ({ className }) => {
	return (
		<IconButton className={className}>
			<Badge badgeContent={0}>
				<NotificationsIcon fontSize='small' />
			</Badge>
		</IconButton>
	);
};

export default NotificationButton;
