import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './chatDisplay.scss';
import ChatBubble from '../ChatBubble';

const ChatDisplay = () => {
	const { activeChat, typing } = useSelector((state) => state.message);
	const scrollableDivRef = useRef(null);
	const conversation = activeChat?.messages;

	const scrollToBottom = () => {
		if (scrollableDivRef.current) {
			const scrollableDiv = scrollableDivRef.current;
			scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	});

	return (
		<div id='chat-display' ref={scrollableDivRef}>
			{conversation?.map((item) => (
				<ChatBubble key={item._id} data={item} />
			))}
			{typing && <ChatBubble typing />}
		</div>
	);
};

export default ChatDisplay;
