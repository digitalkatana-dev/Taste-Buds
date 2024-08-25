import { Container, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	setWarningType,
	setWarningOpen,
	setDeleteData,
} from '../redux/slices/appSlice';
import { getProfile } from '../redux/slices/userSlice';
import { getLatest } from '../redux/slices/notificationSlice';
import { getChat, deleteChat } from '../redux/slices/messageSlice';
import { socket } from '../util/socket';
import DeleteIcon from '@mui/icons-material/Delete';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import PhotoUploadDialog from '../components/PhotoUploadDialog';
import WarningDialog from '../components/WarningDialog';

const Layout = ({ heading, children }) => {
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat } = useSelector((state) => state.message);
	const location = useLocation();
	const dispatch = useDispatch();

	const isChat =
		location.pathname.split('/')[2] &&
		location.pathname.split('/')[2] === 'conversation';

	const chatId = activeChat?._id;

	const handleDeleteClick = () => {
		const data = {
			type: 'chat',
			action: deleteChat(chatId),
		};

		dispatch(setWarningType('delete'));
		dispatch(setDeleteData(data));
		dispatch(setWarningOpen(true));
	};

	const loadChat = useCallback(
		(id) => {
			dispatch(getChat(id));
		},
		[dispatch]
	);

	const handleNotification = useCallback(() => {
		dispatch(getLatest(activeUser?._id));
		dispatch(getProfile(activeUser?._id));
	}, [dispatch, activeUser]);

	socket.on('notification received', () => handleNotification());

	socket.on('message received', (id) => loadChat(id));

	return (
		<Container id='layout' maxWidth='xl'>
			<TopBar page='layout' />
			<div className='content-container'>
				{heading && (
					<div className='heading-container'>
						<h2 className='heading'>{heading}</h2>
						{isChat && (
							<IconButton className='del-chat-btn' onClick={handleDeleteClick}>
								<DeleteIcon className='btn-icon' />
							</IconButton>
						)}
					</div>
				)}
				<div className='content'>{children}</div>
			</div>
			<BottomNav />
			<PhotoUploadDialog />
			<WarningDialog />
		</Container>
	);
};

export default Layout;
