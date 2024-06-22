import React from 'react';
import './chatContainer.scss';
import ChatHeader from '../ChatHeader';
import MatchDisplay from '../MatchDisplay';
import ChatDisplay from '../ChatDisplay';

const ChatContainer = () => {
	return (
		<div id='chat-container'>
			<ChatHeader />

			<div>
				<button className='option'>Matches</button>
				<button className='option'>Chat</button>
			</div>

			<MatchDisplay />
			<ChatDisplay />
		</div>
	);
};

export default ChatContainer;
