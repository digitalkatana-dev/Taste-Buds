import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	retrieveNotifications,
	markAllOpen,
} from '../../redux/slices/notificationSlice';
import './notifications.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Loading from '../../components/Loading';
import IconButton from '../../components/IconButton';
import Notification from '../../components/Notification';

const Notifications = () => {
	const { activeUser } = useSelector((state) => state.user);
	const { loading, allNotifications, unopened } = useSelector(
		(state) => state.notification
	);
	const dispatch = useDispatch();

	const handleMarkAll = () => {
		dispatch(markAllOpen(activeUser._id));
	};

	const loadNotifications = useCallback(() => {
		dispatch(retrieveNotifications(activeUser._id));
	}, [activeUser, dispatch]);

	useEffect(() => {
		loadNotifications();
	}, [loadNotifications]);

	return (
		<div id='notifications'>
			{loading && <Loading />}
			<div className='heading-container'>
				<h2 className='heading'>Notifications</h2>
				<IconButton
					className={unopened.length > 0 ? 'mark-all' : ''}
					onClick={handleMarkAll}
				>
					<DoneAllIcon />
				</IconButton>
			</div>
			{allNotifications?.map((item) => (
				<Notification key={item._id} data={item} />
			))}
		</div>
	);
};

export default Notifications;
