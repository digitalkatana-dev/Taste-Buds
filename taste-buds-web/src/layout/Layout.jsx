import { Container, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setDeleteData, setDeleteOpen } from '../redux/slices/appSlice';
import { deleteChat } from '../redux/slices/messageSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import DeleteDialog from '../components/DeleteDialog';

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

		dispatch(setDeleteData(data));
		dispatch(setDeleteOpen(true));
	};

	return (
		<Container id='layout' maxWidth='xl'>
			<TopBar page='layout' />
			<div className='content-container'>
				{heading && (
					<div className='heading-container'>
						<h2 className='heading'>{heading}</h2>
						{isChat && (
							<IconButton className='chat-btn' onClick={handleDeleteClick}>
								<DeleteIcon className='btn-icon' />
							</IconButton>
						)}
					</div>
				)}
				<div className='content'>{children}</div>
			</div>
			<BottomNav />
			<DeleteDialog />
		</Container>
	);
};

export default Layout;
