import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
	const { activeUser } = useSelector((state) => state.user);

	if (!activeUser) {
		return <Navigate to='/' />;
	}

	return element;
};

export default ProtectedRoute;
