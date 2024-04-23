import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';

const App = () => {
	const { theme } = useSelector((state) => state.app);

	return (
		<div className='app' data-theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/create-profile'
						element={<ProtectedRoute element={<CreateProfile />} />}
					/>
					<Route
						path='/dashboard'
						element={<ProtectedRoute element={<Dashboard />} />}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
