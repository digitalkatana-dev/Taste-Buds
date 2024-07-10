import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
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

export const sendMessage = createAsyncThunk(
	'messages/send_message',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.post('/messages', data);
			const { success } = res.data;
			success &&
				dispatch(
					getConversation({ sender: data.sender, recipient: data.recipient })
				);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getConversation = createAsyncThunk(
	'messages/get_conversation',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/chats/?id=${data}`);
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

export const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState({
	loading: false,
	selectableUsers: null,
	recipients: [],
	message: '',
	chatList: null,
	conversation: null,
	success: null,
	errors: null,
});

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		addRecipient: (state, action) => {
			state.recipients = [...state.recipients, action.payload];
			state.selectableUsers = state.selectableUsers.filter(
				(item) => item._id !== action.payload._id
			);
			// state.selectableUsers = null;
		},
		popRecipient: (state) => {
			state.recipients.pop();
			let updated = [...state.recipients];
			state.recipients = updated;
		},
		removeRecipient: (state, action) => {
			state.recipients = state.recipients.filter(
				(item) => item._id !== action.payload._id
			);
			// state.selectableUsers = state.selectableUsers
			// 	? [...state.selectableUsers, action.payload]
			// 	: [action.payload];
		},
		clearSelectableUsers: (state) => {
			state.selectableUsers = null;
		},
		clearRecipients: (state) => {
			state.recipients = [];
		},
		clearConversation: (state) => {
			state.conversation = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendMessage.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.conversation = action.payload.conversation;
				state.message = '';
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getConversation.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getConversation.fulfilled, (state, action) => {
				state.loading = false;
				state.conversation = action.payload;
			})
			.addCase(getConversation.rejected, (state, action) => {
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
			.addCase(logout, (state) => {
				state.loading = false;
				state.message = '';
				state.chatList = null;
				state.conversation = null;
				state.success = null;
				state.errors = null;
				messageAdapter.removeAll(state);
			});
	},
});

export const {
	setMessage,
	addRecipient,
	popRecipient,
	removeRecipient,
	clearSelectableUsers,
	clearRecipients,
	clearConversation,
} = messageSlice.actions;

export default messageSlice.reducer;
