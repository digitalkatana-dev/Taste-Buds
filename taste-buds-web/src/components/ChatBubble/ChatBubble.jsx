import { Avatar, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import './chatBubble.scss';

const ChatBubble = ({ data }) => {
	const { activeUser } = useSelector((state) => state.user);

	const isMine = activeUser?._id === data?.sender?._id ? true : false;

	if (isMine) {
		return (
			<Chip
				sx={{
					height: 'auto',
					'& .MuiChip-label': {
						display: 'block',
						whiteSpace: 'normal',
					},
				}}
				label={data.content}
				className='chat-bubble mine'
			/>
		);
	}

	return (
		<Chip
			sx={{
				height: 'auto',
				'& .MuiChip-label': {
					display: 'block',
					whiteSpace: 'normal',
				},
			}}
			avatar={
				<Avatar src={data?.sender?.profilePhoto} alt={data?.sender?.handle} />
			}
			label={data?.content}
			className='chat-bubble'
		/>
	);
};

export default ChatBubble;
