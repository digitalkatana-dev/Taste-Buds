import {
	Avatar,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChatName, getChatImages } from '../../util/helpers';
import './chat-item.scss';

const ChatItem = ({ data }) => {
	const { theme } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const chatName = getChatName(user?._id, data);
	let latestMessage = data?.latestMessage
		? `${data?.latestMessage?.sender?.handle}: ${data?.latestMessage?.content}`
		: 'No messages.';
	const chatImage = getChatImages(user?._id, data);

	const handleClick = () => {
		navigate(`/chats/conversation/${data?._id}`);
	};

	return (
		<>
			<ListItem alignItems='center' onClick={handleClick} className='chat-item'>
				{chatImage?.chatImage?.map((item, i) => (
					<ListItemAvatar key={i}>
						<Avatar alt='user' src={item.userImg} />
					</ListItemAvatar>
				))}
				<ListItemText
					primary={chatName}
					secondary={latestMessage}
					secondaryTypographyProps={{ color: 'var(--txt-secondary)' }}
				/>
			</ListItem>
			<Divider
				variant='inset'
				component='div'
				sx={{
					borderColor:
						theme === 'dark'
							? 'rgba(255, 255, 255, 0.12)'
							: 'rgba(0, 0, 0, 0.12)',
				}}
			/>
		</>
	);
};

export default ChatItem;
