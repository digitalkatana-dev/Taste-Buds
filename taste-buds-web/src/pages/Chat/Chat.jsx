import { Container } from '@mui/material';
import './chatPage.scss';
import BottomNav from '../../components/BottomNav';

const Chat = () => {
	return (
		<Container id='chat-page' maxWidth='lg'>
			<div className='content-container'></div>
			<BottomNav />
		</Container>
	);
};

export default Chat;
