import { Button, FormControl, TextField } from '@mui/material';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearSelectableUsers,
	// clearRecipients,
	findUsers,
	addRecipient,
	popRecipient,
	removeRecipient,
	createChat,
} from '../../../../redux/slices/messageSlice';
import './new-message.scss';

const NewMessage = () => {
	const { user } = useSelector((state) => state.user);
	const { selectableUsers, recipients } = useSelector((state) => state.message);
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	let timer;

	const handleKeyDown = (e) => {
		clearTimeout(timer);

		if (e.target.value === '' && e.keyCode === 8) {
			dispatch(popRecipient());
		}

		timer = setTimeout(() => {
			const data = {
				user,
				recipients,
				value: e.target.value.trim(),
			};

			if (e.target.value.trim() === '') {
				dispatch(clearSelectableUsers());
			} else {
				dispatch(findUsers(data));
			}
		}, 1000);
	};

	const handleAddRecipient = (item) => {
		dispatch(addRecipient(item));
		inputRef.current.value = '';
		inputRef.current.focus();
	};

	const handleRemoveRecipient = (item) => {
		dispatch(removeRecipient(item));
	};

	const handleCreateChat = () => {
		const data = {
			users: recipients,
		};

		dispatch(createChat(data));
	};

	return (
		<div id='new-message'>
			<div className='chat-title-bar'>
				<label htmlFor='user-search'>To:</label>
				<div id='selected-users'>
					{recipients?.map((item) => (
						<span
							className='selected'
							onClick={() => handleRemoveRecipient(item)}
						>
							{item.firstName} {item.lastName}
						</span>
					))}
					<FormControl variant='standard'>
						<TextField
							ref={inputRef}
							id='user-search'
							placeholder='Type the name of the person'
							onKeyDown={handleKeyDown}
							size='small'
						/>
					</FormControl>
				</div>
			</div>
			<div className='results-container'>
				{selectableUsers?.map((item) => (
					<div
						className='add-user-btn'
						key={item._id}
						onClick={() => handleAddRecipient(item)}
					>
						{/* <UserTemplate data={item} /> */}
					</div>
				))}
			</div>
			<Button
				variant='contained'
				className='create-chat'
				disabled={recipients.length === 0}
				onClick={handleCreateChat}
			>
				Create Chat
			</Button>
		</div>
	);
};

export default NewMessage;
