import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, sendMessage } from '../../redux/slices/messageSlice';
import { socket } from '../../util/socket';
import SendIcon from '@mui/icons-material/Send';
import './chat-input.scss';
import TextInput from '../TextInput';

const ChatInput = () => {
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat, message } = useSelector((state) => state.message);
	const [typing, setTyping] = useState(false);
	const [lastTypingTime, setLastTypingTime] = useState(null);
	const [timeNow, setTimeNow] = useState(null);
	socket.on('typing', () => setTyping(true));
	socket.on('stop typing', () => setTyping(false));
	const dispatch = useDispatch();
	const theme = activeUser?.theme;
	const chatId = activeChat?._id;

	const handleChange = (e) => {
		dispatch(setMessage(e.target.value));
	};

	const messageSubmitted = () => {
		if (message.trim() !== '') {
			const data = {
				chatId,
				content: message,
			};
			dispatch(sendMessage(data));
			socket.emit('stop typing', chatId);
		}
	};

	const handleKeyDown = (e) => {
		socket.emit('typing', chatId);
		setLastTypingTime(new Date().getTime());
		setTimeout(() => {
			setTimeNow(new Date().getTime());
		}, 3000);

		if (e.keyCode === 13) {
			messageSubmitted();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		messageSubmitted();
	};

	return (
		<div id='chat-input'>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				gap={1}
			>
				<TextInput
					fullWidth
					className={theme === 'dark' ? 'message-input dark' : 'message-input'}
					placeholder='Type a message...'
					size='small'
					margin='dense'
					value={message}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<IconButton
					className='send-btn'
					onClick={handleSubmit}
					disabled={!message}
				>
					<SendIcon className='send-icon' />
				</IconButton>
			</Stack>
		</div>
	);
};

export default ChatInput;
