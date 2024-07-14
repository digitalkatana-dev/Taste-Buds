import { Avatar, AvatarGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import './convo.scss';
import ChatDisplay from '../../../../components/ChatDisplay/ChatDisplay';
import ChatInput from '../../../../components/ChatInput';

const Conversation = () => {
	const { user } = useSelector((state) => state.user);
	const { activeChat } = useSelector((state) => state.message);
	let chatName;

	const chatUsers = activeChat?.users?.filter((item) => item._id !== user?._id);

	chatUsers ? (chatName = `${chatUsers[0]?.firstName}`) : (chatName = '');

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
