import { Container, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const Layout = ({ heading, children }) => {
	const location = useLocation();
	const isChat =
		location.pathname.split('/')[2] &&
		location.pathname.split('/')[2] === 'conversation';

	return (
		<Container id='layout' maxWidth='xl'>
			<TopBar />
			<div className='content-container'>
				{heading && (
					<div className='heading-container'>
						<h2 className='heading'>{heading}</h2>
						{isChat && (
							<IconButton className='chat-btn' href='/chats/new'>
								<DeleteIcon className='btn-icon' />
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
