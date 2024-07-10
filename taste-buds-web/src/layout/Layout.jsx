import { Container, IconButton } from '@mui/material';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import './layout.scss';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const Layout = ({ heading, children }) => {
	return (
		<Container id='layout' maxWidth='xl'>
			<TopBar />
			<div className='content-container'>
				{heading && (
					<div className='heading-container'>
						<h2 className='heading'>{heading}</h2>
						<IconButton className='message-btn' href='/messages/new'>
							<AddCommentOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
				)}
				<div className='content'>{children}</div>
			</div>
			<BottomNav />
		</Container>
	);
};

export default Layout;
