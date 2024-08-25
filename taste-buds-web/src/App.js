import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { setIsMobile } from './redux/slices/appSlice';
import { getLatest } from './redux/slices/notificationSlice';
import { getChat } from './redux/slices/messageSlice';
import { socket } from './util/socket';
import './app.scss';
import Layout from './layout';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Matches from './pages/Matches';
import Chats from './pages/Chats';
import SelectedProfile from './pages/SelectedProfile';
import ActiveProfile from './pages/ActiveProfile';

const App = () => {
	const { authType } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat, socketId } = useSelector((state) => state.message);
	const theme = activeUser?.theme;
	const dispatch = useDispatch();

	socket.on('connect', () => {
		if (activeUser) socket.emit('reconnect', activeUser?._id);
		if (activeChat) {
			socket.emit('rejoin chat', activeChat?._id, socketId);
		} else {
			return;
		}
	});

	socket.on('notification received', () => handleNotification());

	socket.on('message received', () => loadChat());

	const handleMobile = useCallback(() => {
		const handleResize = () => {
			if (window.innerWidth <= 895) {
				dispatch(setIsMobile(true));
			} else {
				dispatch(setIsMobile(false));
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch]);

	const loadChat = useCallback(() => {
		dispatch(getChat(activeChat?._id));
	}, [dispatch, activeChat]);

	const handleNotification = useCallback(() => {
		dispatch(getLatest(activeUser?._id));
	}, [dispatch, activeUser]);

	useEffect(() => {
		handleMobile();
	}, [handleMobile]);

	return (
		<div className='app' data-theme={theme}>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							activeUser && authType === 'signin' ? (
								<Navigate to='/dashboard' />
							) : (
								<Home />
							)
						}
					/>
					<Route
						path='/onboarding'
						element={<ProtectedRoute element={<CreateProfile />} />}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute element={<Layout children={<Dashboard />} />} />
						}
					/>
					<Route
						path='/search'
						element={
							<ProtectedRoute element={<Layout children={<Search />} />} />
						}
					/>
					<Route
						path='/matches'
						element={
							<ProtectedRoute element={<Layout children={<Matches />} />} />
						}
					/>
					<Route
						path='/chats/inbox'
						element={
							<ProtectedRoute
								element={
									<Layout heading='Inbox' children={<Chats type='inbox' />} />
								}
							/>
						}
					/>
					<Route
						path='/chats/conversation/:id'
						element={
							<ProtectedRoute
								element={
									<Layout
										heading='Conversation'
										children={<Chats type='convo' />}
									/>
								}
							/>
						}
					/>
					<Route
						path='/selected-profile/:id'
						element={
							<ProtectedRoute
								element={<Layout children={<SelectedProfile />} />}
							/>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute
								element={<Layout children={<ActiveProfile />} />}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
