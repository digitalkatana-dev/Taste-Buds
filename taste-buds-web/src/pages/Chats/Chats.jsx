import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { socket } from '../../util/socket';
import './chats.scss';
import Looading from '../../components/Loading';
import Inbox from './views/Inbox';
import Conversation from './views/Conversation';

const Chats = ({ type }) => {
	const { loading, activeChat } = useSelector((state) => state.message);
	const location = useLocation();

	const page = location.pathname.split('/')[2];

	useEffect(() => {
		if (activeChat) {
			socket.emit('join chat', activeChat?._id);
		} else {
			return;
		}

		return () => {
			if (activeChat && page !== 'conversation') {
				socket.emit('leave chat', activeChat?._id);
			} else {
				return;
			}
		};
	}, [activeChat, page]);

	return (
		<div id='chats'>
			{loading && <Looading />}
			{type === 'inbox' && <Inbox />}
			{type === 'convo' && <Conversation />}
		</div>
	);
};

export default Chats;
