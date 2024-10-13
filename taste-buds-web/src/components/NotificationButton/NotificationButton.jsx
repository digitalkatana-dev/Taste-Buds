import { Badge, IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notification from '../Notification';
import './notification-btn.scss';

const NotificationButton = ({ className }) => {
	const { unopened } = useSelector((state) => state.notification);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton className={className} onClick={handleClick}>
				<Badge badgeContent={unopened.length}>
					<NotificationsIcon fontSize='small' />
				</Badge>
			</IconButton>
			{unopened.length > 0 && (
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					{unopened.map((item) => (
						<Notification key={item._id} data={item} onClick={handleClose} />
					))}
				</Menu>
			)}
		</div>
	);
};

export default NotificationButton;
