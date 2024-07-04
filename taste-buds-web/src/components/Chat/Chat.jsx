import { useSelector } from 'react-redux';
import './chat.scss';

const Chat = () => {
	const { conversation } = useSelector((state) => state.message);

	return (
		<div id='chat'>
			{conversation?.map((item) => (
				<div key={item._id}>
					<h3>{item.message}</h3>
				</div>
			))}
		</div>
	);
};

export default Chat;
