import { Avatar, AvatarGroup } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './convo.scss';
import ChatDisplay from '../../../../components/ChatDisplay/ChatDisplay';
import ChatInput from '../../../../components/ChatInput';

const Conversation = () => {
	const { user } = useSelector((state) => state.user);
	const { conversation } = useSelector((state) => state.message);
	const [chatName, setChatName] = useState('Frank');

	const chatUsers = conversation?.users?.filter(
		(item) => item._id !== user?._id
	);

	const handleChatNameOpen = () => {};

	return (
		<div id='convo'>
			<div className='title-bar-container'>
				<div className='chat-images-container'>
					<AvatarGroup max={4}>
						{chatUsers?.map((item) => (
							<Avatar
								key={item._id}
								alt={item.username}
								src={item.profilePic}
								style={{ border: 'none' }}
							/>
						))}
					</AvatarGroup>
				</div>
				<span id='chat-name' onClick={handleChatNameOpen}>
					{chatName}
				</span>
			</div>
			<ChatDisplay />
			<ChatInput />
		</div>
	);
};

export default Conversation;
