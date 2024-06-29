import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.scss';

const ChatHeader = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div id='chat-header'>
			<div className='profile'>
				<div className='img-container'>
					<img src={user?.profilePhoto} alt={user?.firstName} />
				</div>
				<h3>@{user?.handle}</h3>
			</div>
			<IconButton className='log-out' onClick={handleLogout}>
				<LogoutIcon fontSize='small' />
			</IconButton>
		</div>
	);
};

export default ChatHeader;
