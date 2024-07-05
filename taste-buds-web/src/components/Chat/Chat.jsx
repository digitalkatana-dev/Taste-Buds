import { useSelector } from 'react-redux';
import './chat.scss';
import ChatBubble from '../ChatBubble';

const Chat = () => {
	const { conversation } = useSelector((state) => state.message);

	return (
		<div id='chat'>
			{conversation?.map((item) => (
				<ChatBubble key={item._id} data={item} />
			))}
		</div>
	);
};

export default Chat;
