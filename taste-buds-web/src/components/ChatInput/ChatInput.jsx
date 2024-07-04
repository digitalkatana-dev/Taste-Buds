import { useDispatch, useSelector } from 'react-redux';
import { setMessage, sendMessage } from '../../redux/slices/messageSlice';
import './input.scss';

const ChatInput = () => {
	const { message } = useSelector((state) => state.message);
	const { user } = useSelector((state) => state.user);
	const { selectedProfile } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(setMessage(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			sender: user?._id,
			recipient: selectedProfile?._id,
			message,
		};

		dispatch(sendMessage(data));
	};

	return (
		<div id='chat-input'>
			<textarea value={message} onChange={handleChange} />
			<button type='submit' className='secondary-btn' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

export default ChatInput;
