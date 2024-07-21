import { useSelector } from 'react-redux';
import './chats.scss';
import Looading from '../../components/Loading';
import Inbox from './views/Inbox';
import Conversation from './views/Conversation';

const Chats = ({ type }) => {
	const { loading } = useSelector((state) => state.message);
	return (
		<div id='chats'>
			{loading && <Looading />}
			{type === 'inbox' && <Inbox />}
			{type === 'convo' && <Conversation />}
		</div>
	);
};

export default Chats;
