import { Avatar, AvatarGroup } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	getChat,
	clearActiveChat,
} from '../../../../redux/slices/messageSlice';
import './convo.scss';
import ChatDisplay from '../../../../components/ChatDisplay/ChatDisplay';
import ChatInput from '../../../../components/ChatInput';

const Conversation = () => {
	const { activeUser } = useSelector((state) => state.user);
	const { activeChat } = useSelector((state) => state.message);
	const location = useLocation();
	const dispatch = useDispatch();

	const chat = location.pathname.split('/')[3];
	const chatUsers = activeChat?.users?.filter(
		(item) => item._id !== activeUser?._id
	);

	let chatName;

	chatUsers ? (chatName = `${chatUsers[0]?.firstName}`) : (chatName = '');

	const loadChat = useCallback(() => {
		dispatch(getChat(chat));
	}, [dispatch, chat]);

	const clearChat = useCallback(() => {
		dispatch(clearActiveChat());
	}, [dispatch]);

	useEffect(() => {
		loadChat();

		return () => {
			clearChat();
		};
	}, [loadChat, clearChat]);

	return (
		<div id='convo'>
			<div className='title-bar-container'>
				<div className='chat-images-container'>
					<AvatarGroup max={4}>
						{chatUsers?.map((item) => (
							<Avatar
								key={item._id}
								alt={item.handle}
								src={item.profilePhoto}
								style={{ border: 'none' }}
							/>
						))}
					</AvatarGroup>
				</div>
				<span id='chat-name'>{chatName}</span>
			</div>
			<ChatDisplay />
			<ChatInput />
		</div>
	);
};

export default Conversation;
