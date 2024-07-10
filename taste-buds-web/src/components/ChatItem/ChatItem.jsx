import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChatName, getChatImages } from '../../util/helpers';
import './chat-item.scss';

const ChatItem = ({ data }) => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const chatName = getChatName(user?._id, data);
	let latestMessage = data?.latestMessage
		? `${data?.latestMessage?.sender?.username}: ${data?.latestMessage?.content}`
		: 'No messages.';
	const chatImage = getChatImages(user?._id, data);

	return (
		<div className='chat-item'>
			<div className='user-image-section'>
				{chatImage?.chatImage?.map((item, i) => (
					<div
						className={
							chatImage.groupChatClass
								? `user-image-container ${chatImage.groupChatClass}`
								: 'user-image-container'
						}
						key={i}
					>
						<img src={item.userImg} alt='user' className='user-image' />
					</div>
				))}
			</div>
			<div className='details-container ellipsis'>
				<span className='heading ellipsis'>{chatName}</span>
				<span className='sub-txt ellipsis'>{latestMessage}</span>
			</div>
		</div>
	);
};

export default ChatItem;
