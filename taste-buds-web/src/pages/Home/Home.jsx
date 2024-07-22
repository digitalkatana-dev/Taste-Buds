import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthType } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import './home.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import AuthDialog from '../../components/AuthDialog';

const Home = () => {
	const { user } = useSelector((state) => state.user);
	const [showDialog, setShowDialog] = useState(false);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (user) {
			dispatch(logout());
		} else {
			dispatch(setAuthType('signup'));
			setShowDialog(true);
		}
	};

	return (
		<div className='overlay'>
			<Nav setShowDialog={setShowDialog} />
			<div className='home'>
				<h1 className='primary-title'>Swipe Right®</h1>
				<Button
					variant='contained'
					size='large'
					className='primary-btn'
					onClick={handleClick}
				>
					{user ? 'Signout' : 'Create Account'}
				</Button>
			</div>
			<AuthDialog open={showDialog} setShowDialog={setShowDialog} />
		</div>
	);
};

export default Home;
