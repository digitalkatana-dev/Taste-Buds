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
	const { activeUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const theme = activeUser?.theme;

	const chatName = getChatName(activeUser?._id, data);
	let latestMessage = data?.latestMessage
		? `${data?.latestMessage?.sender?.handle}: ${data?.latestMessage?.content}`
		: 'No messages.';
	const chatImage = getChatImages(activeUser?._id, data);

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
					secondaryTypographyProps={{
						noWrap: true,
						color: 'var(--txt-secondary)',
					}}
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
