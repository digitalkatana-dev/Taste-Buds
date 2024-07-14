import { List } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatList } from '../../../../redux/slices/messageSlice';
import './inbox.scss';
import ChatItem from '../../../../components/ChatItem';

const Inbox = () => {
	const { chatList } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	const loadChatList = useCallback(() => {
		dispatch(getChatList());
	}, [dispatch]);

	useEffect(() => {
		loadChatList();
	}, [loadChatList]);

	return (
		<div id='inbox'>
			{chatList?.length > 0 ? (
				<List sx={{ width: '100%', maxWidth: 360 }}>
					{chatList?.map((item) => (
						<ChatItem key={item._id} data={item} />
					))}
				</List>
			) : (
				<span className='no-results'>
					Move along, there's nothing to see here!
				</span>
			)}
		</div>
	);
};

export default Inbox;
