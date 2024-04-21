import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'light',
	authType: 'login',
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
	},
});

export const {
	setTheme,
	setAuthType,
	setIsMobile,
	openDelete,
	setDeleteData,
	setContentDialog,
} = appSlice.actions;

export default appSlice.reducer;
