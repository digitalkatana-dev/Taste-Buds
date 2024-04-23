import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputAdornment,
	ListItem,
} from '@mui/material';
import { setAuthType } from '../../redux/slices/appSlice';
import {
	signup,
	signin,
	setLogin,
	setEmail,
	setPassword,
	setConfirmPassword,
	clearSuccess,
	clearErrors,
} from '../../redux/slices/userSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './auth-dialog.scss';
import Button from '../Button';
import TextInput from '../TextInput';

const AuthDialog = ({ open, setShowDialog }) => {
	const { authType } = useSelector((state) => state.app);
	const { login, email, password, confirmPassword, success, errors } =
		useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleClose = () => {
		setShowDialog(false);
		dispatch(setAuthType('signin'));
	};

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e, input) => {
		const action_map = {
			email: setEmail,
			login: setLogin,
			password: setPassword,
			confirm: setConfirmPassword,
		};

		const action = action_map[input];

		if (action) {
			dispatch(action(e.target.value));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			handle: email,
			email,
			password,
		};

		dispatch(signup(data));
	};

	// const handleDisable = () => {
	// 	if (authType === 'signup') {
	// 		if (
	// 			password !== '' &&
	// 			confirmPassword !== '' &&
	// 			password === confirmPassword
	// 		) {
	// 			return false;
	// 		} else if (password !== confirmPassword) {
	// 			return true;
	// 		}
	// 	} else if (authType === 'signin') {
	// 		if (login === '' || password === '') {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	}
	// };

	const handleNavigation = useCallback(() => {
		if (success && success === 'Account created successfully!') {
			navigate('/create-profile');
			setTimeout(() => {
				dispatch(clearSuccess());
			}, 2000);
		}
	}, [success, navigate, dispatch]);

	useEffect(() => {
		handleNavigation();
	}, [handleNavigation]);

	return (
		<Dialog open={open} maxWidth='xs' fullWidth>
			<ListItem sx={{ justifyContent: 'end' }}>
				<IconButton size='small' onClick={handleClose}>
					<HighlightOffIcon fontSize='medium' />
				</IconButton>
			</ListItem>
			<DialogTitle sx={{ fontWeight: 'bold' }}>
				{authType === 'signin' ? 'LOG IN' : 'CREATE ACCOUNT'}
			</DialogTitle>
			<DialogContent sx={{ padding: '35px' }}>
				<p>
					By clicking Log In, you agree to our terms. Learn how we process your
					data in our Privacy Policy and Cookie Policy.
				</p>
				<form onSubmit={handleSubmit}>
					{authType === 'signup' && (
						<TextInput
							fullWidth
							className='auth-input'
							type='email'
							label='Email'
							size='small'
							margin='dense'
							value={email}
							onFocus={handleFocus}
							onChange={(e) => handleChange(e, 'email')}
							error={errors?.email}
						/>
					)}
					{authType === 'signin' && (
						<TextInput
							fullWidth
							className='auth-input'
							label='Login'
							size='small'
							margin='dense'
							value={login}
							onFocus={handleFocus}
							onChange={(e) => handleChange(e, 'login')}
							error={errors?.login}
						/>
					)}
					<TextInput
						fullWidth
						className='auth-input'
						type={show ? 'text' : 'password'}
						label='Password'
						size='small'
						margin='dense'
						value={password}
						onFocus={handleFocus}
						onChange={(e) => handleChange(e, 'password')}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShow(!show)}
										onMouseDown={(e) => e.preventDefault()}
										edge='end'
									>
										{show ? (
											<VisibilityOff className='visibility-icon' />
										) : (
											<Visibility className='visibility-icon' />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						error={errors?.password}
					/>
					{authType === 'signup' && (
						<TextInput
							fullWidth
							className='auth-input'
							type={showConfirm ? 'text' : 'password'}
							label='Confirm Password'
							size='small'
							margin='dense'
							value={confirmPassword}
							onFocus={handleFocus}
							onChange={(e) => handleChange(e, 'confirm')}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowConfirm(!showConfirm)}
											onMouseDown={(e) => e.preventDefault()}
											edge='end'
										>
											{showConfirm ? (
												<VisibilityOff className='visibility-icon' />
											) : (
												<Visibility className='visibility-icon' />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							error={errors?.password}
						/>
					)}
					<Button
						// disabled={true}
						type='submit'
						className='secondary-btn'
						fullWidth
					>
						Submit
					</Button>
				</form>
				<Divider sx={{ margin: '20px 0' }} />
				<h2>GET THE APP</h2>
			</DialogContent>
		</Dialog>
	);
};

export default AuthDialog;
