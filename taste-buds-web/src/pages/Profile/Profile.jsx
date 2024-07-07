import { Container } from '@mui/material';
import './profile.scss';
import BottomNav from '../../components/BottomNav';

const Profile = () => {
	return (
		<Container id='profile' maxWidth='lg'>
			<div className='content-container'></div>
			<BottomNav />
		</Container>
	);
};

export default Profile;
