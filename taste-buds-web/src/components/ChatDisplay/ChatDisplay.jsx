import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import './chatDisplay.scss';
import ChatBubble from '../ChatBubble';

const ChatDisplay = () => {
	const { activeChat, typing } = useSelector((state) => state.message);
	const conversation = activeChat?.messages;

	return (
		<div id='chat-display'>
			{conversation?.map((item) => (
				<ChatBubble key={item._id} data={item} />
			))}
			<div className='typing-badge'>
				<h5>
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
				</h5>
			</div>
			{/* {typing && (
				<div className='typing-badge'>
					<h5>
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
					</h5>
				</div>
			)} */}
		</div>
	);
};

export default ChatDisplay;
