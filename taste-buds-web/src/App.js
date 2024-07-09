import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
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
						element={<ProtectedRoute element={<Dashboard />} />}
					/>
					<Route
						path='/search'
						element={<ProtectedRoute element={<Search />} />}
					/>
					<Route
						path='/matches'
						element={<ProtectedRoute element={<Matches />} />}
					/>
					<Route
						path='/chats'
						element={<ProtectedRoute element={<Chats />} />}
					/>
					<Route
						path='/profile'
						element={<ProtectedRoute element={<Profile />} />}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
