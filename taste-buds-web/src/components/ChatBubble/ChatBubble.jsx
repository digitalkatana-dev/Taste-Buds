import { Avatar, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import './chatBubble.scss';

const ChatBubble = ({ data, typing }) => {
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

	if (typing) {
		return (
			<Chip
				sx={{
					height: 'auto',
					'& .MuiChip-label': {
						display: 'block',
						whiteSpace: 'normal',
					},
				}}
				label={
					<span>
						Typing
						<TypeAnimation
							deletionSpeed={100}
							cursor={false}
							sequence={[
								'.', // Types '.'
								500, // Waits 500ms
								'..', // Types another '.'
								500, // Waits 500ms
								'...', // Types another '.'
								500, // Waits 500ms
								'', // Deletes everything
								500, // Waits 500ms before restarting
							]}
							wrapper='span'
							repeat={Infinity}
						/>
					</span>
				}
				className='chat-bubble'
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
