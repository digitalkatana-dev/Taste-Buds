import { Container } from '@mui/material';
import './matches.scss';
import MatchDisplay from '../../components/MatchDisplay';
import BottomNav from '../../components/BottomNav';

const Matches = () => {
	return (
		<Container id='matches' maxWidth='lg'>
			<div className='content-container'>
				<MatchDisplay />
			</div>
			<BottomNav />
		</Container>
	);
};

export default Matches;
