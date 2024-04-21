import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	login: '',
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	phone: {
		mobile: '',
		home: '',
		work: '',
	},
	communication: {
		email: true,
		sms: false,
		voice: false,
		snail: false,
	},
	user: null,
	allUsers: null,
	success: null,
	errors: null,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setConfirmPassword: (state, action) => {
			state.confirmPassword = action.payload;
		},
		clearUser: (state) => {
			state.firstName = '';
			state.lastName = '';
			state.username = '';
			state.email = '';
			state.phone = {
				mobile: '',
				home: '',
				work: '',
			};
			state.communication = {
				email: true,
				sms: false,
				voice: false,
				snail: false,
			};
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
		logout: (state) => {
			localStorage.removeItem('token');
			state.loading = false;
			state.acctOpen = false;
			state.notificationOpen = false;
			state.languageOpen = false;
			state.drawerOpen = false;
			state.authType = 'login';
			state.login = '';
			state.firstName = '';
			state.lastName = '';
			state.username = '';
			state.email = '';
			state.password = '';
			state.confirmPassword = '';
			state.phone = {
				mobile: '',
				home: '',
				work: '',
			};
			state.communication = {
				email: true,
				sms: false,
				voice: false,
				snail: false,
			};
			state.user = null;
			state.allUsers = null;
			state.success = null;
			state.errors = null;
			userAdapter.removeAll(state);
		},
	},
	extraReducers: (builder) => {},
});

export const {
	setEmail,
	setPassword,
	setConfirmPassword,
	clearUser,
	clearSuccess,
	clearErrors,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
