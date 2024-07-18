import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, sendMessage } from '../../redux/slices/messageSlice';
import SendIcon from '@mui/icons-material/Send';
import './chat-input.scss';
import TextInput from '../TextInput';

const ChatInput = () => {
	const { theme } = useSelector((state) => state.app);
	const { activeChat, message } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(setMessage(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			chatId: activeChat?._id,
			content: message,
		};
		dispatch(sendMessage(data));
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
