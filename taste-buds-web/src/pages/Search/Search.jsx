import { Container } from '@mui/material';
import './search.scss';
import BottomNav from '../../components/BottomNav';

const Search = () => {
	return (
		<Container id='search' maxWidth='lg'>
			<div className='content-container'></div>
			<BottomNav />
		</Container>
	);
};

export default Search;
