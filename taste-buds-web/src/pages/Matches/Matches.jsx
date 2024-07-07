import { Container } from '@mui/material';
import './matches.scss';
import BottomNav from '../../components/BottomNav';

const Matches = () => {
	return (
		<Container id='matches' maxWidth='lg'>
			<div className='content-container'></div>
			<BottomNav />
		</Container>
	);
};

export default Matches;
