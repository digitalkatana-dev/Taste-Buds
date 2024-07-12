import { useSelector } from 'react-redux';
import './inbox.scss';
import ChatItem from '../../../../components/ChatItem';

const Inbox = () => {
	const { chatList } = useSelector((state) => state.message);

	return (
		<div id='inbox'>
			{chatList?.map((item) => (
				<ChatItem key={item._id} data={item} />
			))}
			{!chatList && (
				<span className='no-results'>
					Move along, there's nothing to see here!
				</span>
			)}
		</div>
	);
};

export default Inbox;
