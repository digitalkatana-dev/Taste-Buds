import React from 'react';
import './chatHeader.scss';

const ChatHeader = () => {
	return (
		<div id='chat-header'>
			<div className='profile'>
				<div className='img-container'>
					<img src='' alt='' />
				</div>
				<h3>UserName</h3>
			</div>
			<i className='log-out'>⬅️</i>
		</div>
	);
};

export default ChatHeader;
