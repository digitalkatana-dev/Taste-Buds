import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'light',
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
	deleteDialog: false,
	deleteData: null,
	contentDialog: false,
	errors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
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
		openDelete: (state, action) => {
			state.deleteDialog = action.payload;
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
		builder.addCase(logout, (state) => {
			state.loading = false;
			state.theme = 'light';
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
			state.deleteDialog = false;
			state.deleteData = null;
			state.contentDialog = false;
			state.errors = null;
			appAdapter.removeAll(state);
		});
	},
});

export const {
	setTheme,
	setAuthType,
	setFoodTypeOptions,
	setSelectedProfile,
	setIsMobile,
	openDelete,
	setDeleteData,
	setContentDialog,
	resetOptions,
} = appSlice.actions;

export default appSlice.reducer;
