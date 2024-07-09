import { Container } from '@mui/material';
import './chats.scss';
import Inbox from './views/Inbox';
import BottomNav from '../../components/BottomNav';

const Chats = () => {
	return (
		<Container id='chats' maxWidth='lg'>
			<div className='content-container'>
				<Inbox />
			</div>
			<BottomNav />
		</Container>
	);
};

export default Chats;
