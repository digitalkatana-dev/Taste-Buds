import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
import budsApi from '../../api/budsApi';

export const getSelectedProfile = createAsyncThunk(
	'app/get_selected_profile',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/profiles/?id=${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	authType: 'signin',
	foodTypeOptions: [
		'Italian',
		'Thai',
		'Greek',
		'American',
		'Indian',
		'German',
		'French',
		'Mexican',
	],
	selectedProfile: null,
	isMobile: false,
	photoOpen: false,
	photoDialogType: '',
	deleteOpen: false,
	deleteData: null,
	contentDialog: false,
	errors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAuthType: (state, action) => {
			state.authType = action.payload;
		},
		setFoodTypeOptions: (state, action) => {
			state.foodTypeOptions = action.payload;
		},
		setSelectedProfile: (state, action) => {
			state.selectedProfile = action.payload;
		},
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setPhotoOpen: (state, action) => {
			state.photoOpen = action.payload;
		},
		setPhotoDialogType: (state, action) => {
			state.photoDialogType = action.payload;
		},
		setDeleteOpen: (state, action) => {
			state.deleteOpen = action.payload;
		},
		setDeleteData: (state, action) => {
			state.deleteData = action.payload;
		},
		setContentDialog: (state, action) => {
			state.contentDialog = action.payload;
		},
		resetOptions: (state) => {
			state.foodTypeOptions = [
				'Italian',
				'Thai',
				'Greek',
				'American',
				'Indian',
				'German',
				'French',
				'Mexican',
			];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSelectedProfile.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getSelectedProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProfile = action.payload;
			})
			.addCase(getSelectedProfile.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				state.loading = false;
				state.authType = 'signin';
				state.foodTypeOptions = [
					'Italian',
					'Thai',
					'Greek',
					'American',
					'Indian',
					'German',
					'French',
					'Mexican',
				];
				state.selectedProfile = null;
				state.isMobile = false;
				state.photoOpen = false;
				state.photoDialogType = '';
				state.deleteOpen = false;
				state.deleteData = null;
				state.contentDialog = false;
				state.errors = null;
				appAdapter.removeAll(state);
			});
	},
});

export const {
	setAuthType,
	setFoodTypeOptions,
	setSelectedProfile,
	setIsMobile,
	setPhotoOpen,
	setPhotoDialogType,
	setDeleteOpen,
	setDeleteData,
	setContentDialog,
	resetOptions,
} = appSlice.actions;

export default appSlice.reducer;
