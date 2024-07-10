import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import Layout from './layout';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Matches from './pages/Matches';
import Chats from './pages/Chats';
import Profile from './pages/Profile';

const App = () => {
	const { theme } = useSelector((state) => state.app);

	return (
		<div className='app' data-theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
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
						path='/chats/new'
						element={
							<ProtectedRoute
								element={
									<Layout heading='New Chat' children={<Chats type='new' />} />
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
						path='/profile'
						element={
							<ProtectedRoute element={<Layout children={<Profile />} />} />
						}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
