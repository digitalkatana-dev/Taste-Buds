import { useState } from 'react';
import './input.scss';

const ChatInput = () => {
	const [textArea, setTextArea] = useState(null);

	return (
		<div id='chat-input'>
			<textarea
				value={textArea}
				onChange={(e) => setTextArea(e.target.value)}
			/>
			<button className='secondary-btn'>Submit</button>
		</div>
	);
};

export default ChatInput;
