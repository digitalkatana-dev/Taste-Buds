import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setTyping,
	setMessage,
	sendMessage,
} from '../../../../redux/slices/messageSlice';
import { socket } from '../../../../util/socket';
import SendIcon from '@mui/icons-material/Send';
import './chat-input.scss';
import TextInput from '../../../../components/TextInput';
import IconButton from '../../../IconButton';

const ChatInput = () => {
	const { selectedProfile } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat, message } = useSelector((state) => state.message);
	const [lastTypingTime, setLastTypingTime] = useState(null);
	const [timeNow, setTimeNow] = useState(null);
	const dispatch = useDispatch();
	const theme = activeUser?.theme;
	const chatId = activeChat?._id;

	socket.on('typing', () => dispatch(setTyping(true)));
	socket.on('stop typing', () => dispatch(setTyping(false)));

	let timeDiff = timeNow - lastTypingTime;

	const handleChange = (e) => {
		dispatch(setMessage(e.target.value));
	};

	const messageSubmitted = () => {
		if (message.trim() !== '') {
			const data = {
				chatId,
				content: message,
				recipient: selectedProfile?._id,
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

	useEffect(() => {
		if (timeDiff >= 3000) socket.emit('stop typing', chatId);
	}, [timeDiff, chatId]);

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
