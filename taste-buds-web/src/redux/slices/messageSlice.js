import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import budsApi from '../../api/budsApi';

export const sendMessage = createAsyncThunk(
	'messages/send_message',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.post('/messages', data);
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
	activeProfileMessages: null,
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
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
