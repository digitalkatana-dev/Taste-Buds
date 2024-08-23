import { Container, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	setWarningType,
	setWarningOpen,
	setDeleteData,
} from '../redux/slices/appSlice';
import { deleteChat } from '../redux/slices/messageSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import PhotoUploadDialog from '../components/PhotoUploadDialog';
import WarningDialog from '../components/WarningDialog';

const Layout = ({ heading, children }) => {
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
