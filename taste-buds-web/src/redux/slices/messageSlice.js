import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
import { socket } from '../../util/socket';
import budsApi from '../../api/budsApi';

export const findUsers = createAsyncThunk(
	'messages/find_users',
	async (data, { rejectWithValue, dispatch }) => {
		const { user, recipients, value } = data;
		try {
			const res = await budsApi.get(`/profiles/?search=${value}`);
			const base = res?.data?.filter((item) => item._id !== user._id);
			const filtered = base?.filter(
				(item) => !recipients.some((user) => item._id === user._id)
			);

			return filtered.length > 0 ? filtered : null;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const createChat = createAsyncThunk(
	'messages/create_chat',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.post('/chats', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getChatList = createAsyncThunk(
	'messages/get_chat_list',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get('/chats');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getChat = createAsyncThunk(
	'messages/get_chat',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.get(`/chats/?id=${data}`);
			return res.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateChat = createAsyncThunk(
	'messages/update_chat',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.put(`/chats/${data._id}`, data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.resposne.data);
		}
	}
);

export const sendMessage = createAsyncThunk(
	'messages/send_message',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.post('/messages', data);
			const { success } = res.data;
			if (success) {
				dispatch(getChat(data.chatId));
				dispatch(getChatList());
			}
			return res.data;
		} catch (err) {
			console.log('Send error', err);
			return rejectWithValue(err.resposne.data);
		}
	}
);

export const getUnread = createAsyncThunk(
	'messages/get_unread',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get('/chats/?unread=true');
			return res.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNewest = createAsyncThunk(
	'messages/get_newest',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get('/chats/?newest=true');
			return res.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const markAllRead = createAsyncThunk(
	'messages/mark_all_read',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.put(`/messages/${data}/markRead`);
			const { success } = res.data;
			if (success) {
				dispatch(getUnread());
			}
			return success;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteChat = createAsyncThunk(
	'messages/delete_chat',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.delete(`/chats/${data}`);
			const { success } = res.data;
			success && dispatch(getChatList());
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState({
	loading: false,
	recipients: [],
	typing: false,
	message: '',
	chatList: null,
	unread: [],
	newest: null,
	activeChat: null,
	socketId: null,
	success: null,
	errors: null,
});

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setTyping: (state, action) => {
			state.typing = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setSocketId: (state, action) => {
			state.socketId = action.payload;
		},
		addRecipient: (state, action) => {
			state.recipients = [...state.recipients, action.payload];
		},
		popRecipient: (state) => {
			// state.recipients.pop();
			// let updated = [...state.recipients];
			// state.recipients = updated;
			state.recipients = state.recipients.pop();
		},
		removeRecipient: (state, action) => {
			state.recipients = state.recipients.filter(
				(item) => item._id !== action.payload._id
			);
			// state.selectableUsers = state.selectableUsers
			// 	? [...state.selectableUsers, action.payload]
			// 	: [action.payload];
		},
		clearRecipients: (state) => {
			state.recipients = [];
		},
		clearActiveChat: (state) => {
			state.activeChat = null;
		},
		clearNewest: (state) => {
			state.newest = null;
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createChat.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createChat.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.recipients = [];
				window.location.href = `/messages/${action.payload.newChat._id}`;
			})
			.addCase(createChat.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(sendMessage.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				socket.emit('new message', action.payload.newMessage);
				state.message = '';
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getChatList.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getChatList.fulfilled, (state, action) => {
				state.loading = false;
				state.chatList = action.payload;
			})
			.addCase(getChatList.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getChat.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getChat.fulfilled, (state, action) => {
				state.loading = false;
				state.activeChat = action.payload;
			})
			.addCase(getChat.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateChat.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateChat.fulfilled, (state, action) => {
				state.loading = false;
				state.activeChat = action.payload.updated;
				state.success = action.payload.success;
			})
			.addCase(updateChat.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getUnread.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getUnread.fulfilled, (state, action) => {
				state.loading = false;
				state.unread = action.payload;
			})
			.addCase(getUnread.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNewest.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNewest.fulfilled, (state, action) => {
				state.loading = false;
				state.newest = action.payload;
			})
			.addCase(getNewest.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(markAllRead.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(markAllRead.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(markAllRead.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteChat.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteChat.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				window.location.href = '/chats/inbox';
			})
			.addCase(deleteChat.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				state.loading = false;
				state.typing = false;
				state.message = '';
				state.chatList = null;
				state.unread = [];
				state.newest = null;
				state.activeChat = null;
				state.socketId = null;
				state.success = null;
				state.errors = null;
				messageAdapter.removeAll(state);
			});
	},
});

export const {
	setTyping,
	setMessage,
	setSocketId,
	addRecipient,
	popRecipient,
	removeRecipient,
	clearRecipients,
	clearActiveChat,
	clearNewest,
	clearSuccess,
	clearErrors,
} = messageSlice.actions;

export default messageSlice.reducer;
