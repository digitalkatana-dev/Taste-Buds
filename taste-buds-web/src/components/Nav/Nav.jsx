import React from 'react';
import { useSelector } from 'react-redux';
import './nav.scss';
import darkLogo from '../../assets/logo-dark.png';
import lightLogo from '../../assets/logo-light.png';
import Button from '../Button';

const Nav = ({ minimal, setShowDialog }) => {
	const { user } = useSelector((state) => state.user);

	const handleClick = () => {
		setShowDialog(true);
	};

	return (
		<nav>
			<div className='logo-container'>
				<img className='logo' src={minimal ? darkLogo : lightLogo} alt='' />
			</div>
			{!user && !minimal && (
				<Button variant='contained' className='login-btn' onClick={handleClick}>
					Log in
				</Button>
			)}
		</nav>
	);
};

export default Nav;
