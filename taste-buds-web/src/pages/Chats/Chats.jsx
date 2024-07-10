import './chats.scss';
import Inbox from './views/Inbox';
import NewMessage from './views/NewMessage';
import Conversation from './views/Conversation';

const Chats = ({ type }) => {
	return (
		<div id='chats'>
			{type === 'inbox' && <Inbox />}
			{type === 'new' && <NewMessage />}
			{type === 'convo' && <Conversation />}
		</div>
	);
};

export default Chats;
