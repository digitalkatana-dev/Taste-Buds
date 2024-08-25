import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
import budsApi from '../../api/budsApi';

export const retrieveNotifications = createAsyncThunk(
	'notification/get_notifications',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/notifications/${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getUnopened = createAsyncThunk(
	'notification/get_unopened',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/notifications/${data}/?unopened=true`);
			const { myNotifications } = res.data;
			return myNotifications;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getLatest = createAsyncThunk(
	'notification/get_latest',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.get(`/notifications/${data}/?latest=true`);
			const { myNotifications, success } = res.data;
			if (success) {
				dispatch(getUnopened(data));
			}
			return myNotifications;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const toggleOpened = createAsyncThunk(
	'notification/toggle_opened',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.put(`/notifications/${data}/toggle`);
			const { success } = res.data;
			if (success) {
				dispatch(retrieveNotifications());
				dispatch(getUnopened());
			}
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const markAllOpen = createAsyncThunk(
	'notification/mark_all_as_read',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.put(`/notifications/${data}/mark-all-read`);
			const { success } = res.data;
			if (success) {
				dispatch(retrieveNotifications());
				dispatch(getUnopened());
			}
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const notificationAdapter = createEntityAdapter();
const initialState = notificationAdapter.getInitialState({
	loading: false,
	allNotifications: null,
	latest: null,
	unopened: [],
	success: null,
	errors: null,
});

export const notificatiionSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		clearLatest: (state) => {
			state.latest = null;
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
			.addCase(retrieveNotifications.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(retrieveNotifications.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.allNotifications = action.payload.myNotifications;
			})
			.addCase(retrieveNotifications.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getUnopened.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getUnopened.fulfilled, (state, action) => {
				state.loading = false;
				state.unopened = action.payload;
			})
			.addCase(getUnopened.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getLatest.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getLatest.fulfilled, (state, action) => {
				state.loading = false;
				state.latest = action.payload;
			})
			.addCase(getLatest.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(toggleOpened.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(toggleOpened.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(toggleOpened.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(markAllOpen.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(markAllOpen.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(markAllOpen.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				state.loading = false;
				state.allNotifications = null;
				state.latest = null;
				state.unopened = [];
				state.success = null;
				state.errors = null;
			});
	},
});

export const { clearLatest, clearSuccess, clearErrors } =
	notificatiionSlice.actions;

export default notificatiionSlice.reducer;
