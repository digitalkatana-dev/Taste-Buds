import { Avatar, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import './chatBubble.scss';

const ChatBubble = ({ data }) => {
	const { user } = useSelector((state) => state.user);

	const isMine = user?._id === data?.sender?._id ? true : false;

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
				label={data.message}
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
			label={data?.message}
			className='chat-bubble'
		/>
	);
};

export default ChatBubble;
