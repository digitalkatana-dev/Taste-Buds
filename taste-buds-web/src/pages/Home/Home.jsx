import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthType } from '../../redux/slices/appSlice';
import { logout } from '../../redux/slices/userSlice';
import './home.scss';
import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import AuthDialog from '../../components/AuthDialog';

const Home = () => {
	const { activeUser } = useSelector((state) => state.user);
	const [showDialog, setShowDialog] = useState(false);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (activeUser) {
			dispatch(logout());
		} else {
			dispatch(setAuthType('signup'));
			setShowDialog(true);
		}
	};

	return (
		<div className='overlay'>
			<TopBar page='home' setShowDialog={setShowDialog} />
			<div className='home'>
				<h1 className='primary-title'>Make a Friend, Grab Some Grub®</h1>
				<Button
					variant='contained'
					size='large'
					className='primary-btn'
					onClick={handleClick}
				>
					{activeUser ? 'Signout' : 'Create Account'}
				</Button>
			</div>
			<AuthDialog open={showDialog} setShowDialog={setShowDialog} />
		</div>
	);
};

export default Home;
