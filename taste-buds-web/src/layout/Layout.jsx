import { Container, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const Layout = ({ heading, children }) => {
	const location = useLocation();

	const isInbox =
		location.pathname.split('/')[2] &&
		location.pathname.split('/')[2] === 'inbox';
	const isChat =
		location.pathname.split('/')[2] &&
		location.pathname.split('/')[2] === 'conversation';
	// const chatId = location.pathname.split('/')[3];

	return (
		<Container id='layout' maxWidth='xl'>
			<TopBar />
			<div className='content-container'>
				{heading && (
					<div className='heading-container'>
						<h2 className='heading'>{heading}</h2>
						{(isInbox || isChat) && (
							<IconButton className='chat-btn' href='/chats/new'>
								<AddCommentOutlinedIcon className='btn-icon' />
							</IconButton>
						)}
					</div>
				)}
				<div className='content'>{children}</div>
			</div>
			<BottomNav />
		</Container>
	);
};

export default Layout;
