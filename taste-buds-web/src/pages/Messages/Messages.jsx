import { Container } from '@mui/material';
import './messages.scss';
import Inbox from './views/Inbox';
import BottomNav from '../../components/BottomNav';

const Messages = () => {
	return (
		<Container id='messages' maxWidth='lg'>
			<div className='content-container'>
				<Inbox />
			</div>
			<BottomNav />
		</Container>
	);
};

export default Messages;
