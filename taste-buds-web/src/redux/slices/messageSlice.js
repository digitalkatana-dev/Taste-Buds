import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
import budsApi from '../../api/budsApi';

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
			const res = await budsApi.get(
				`/messages/conversation/${data.sender}-&-${data.recipient}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState({
	loading: false,
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

export const { setMessage, clearConversation } = messageSlice.actions;

export default messageSlice.reducer;
