import './chats.scss';
import Inbox from './views/Inbox';
import Conversation from './views/Conversation';

const Chats = ({ type }) => {
	return (
		<div id='chats'>
			{type === 'inbox' && <Inbox />}
			{type === 'convo' && <Conversation />}
		</div>
	);
};

export default Chats;
