import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getSelectedProfile,
	setSelectedProfile,
} from '../../redux/slices/appSlice';
import { clearSuccess } from '../../redux/slices/userSlice';
import Loading from '../../components/Loading';
import UserProfile from '../../components/UserProfile';

const SelectedProfile = () => {
	const { loading } = useSelector((state) => state.app);
	const { success } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const profile = location.pathname.split('/')[2];

	const loadSelectedProfile = useCallback(() => {
		dispatch(getSelectedProfile(profile));
	}, [dispatch, profile]);

	const clearSelectedProfile = useCallback(() => {
		dispatch(setSelectedProfile(null));
	}, [dispatch]);

	const handleUnmatchSuccess = useCallback(() => {
		if (success) {
			if (success === 'Match removed successfully!') {
				navigate('/matches');
			}

			setTimeout(() => {
				dispatch(clearSuccess());
			}, 2000);
		}
	}, [navigate, dispatch, success]);

	useEffect(() => {
		loadSelectedProfile();

		return () => {
			clearSelectedProfile();
		};
	}, [loadSelectedProfile, clearSelectedProfile]);

	useEffect(() => {
		handleUnmatchSuccess();
	}, [handleUnmatchSuccess]);

	return (
		<div id='selected-profile'>
			{loading && <Loading />}
			<UserProfile />
		</div>
	);
};

export default SelectedProfile;
