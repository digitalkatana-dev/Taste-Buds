import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import budsApi from '../../api/budsApi';

export const signup = createAsyncThunk(
	'user/signup',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.post('/users/signup', data);
			const { token, ...others } = res.data;
			localStorage.setItem('token', token);
			return others;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const signin = createAsyncThunk(
	'user/signin',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.post('/users/signin', data);
			const { success, userProfile, token } = res.data;
			localStorage.setItem('token', token);
			return { success, userProfile };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const createProfile = createAsyncThunk(
	'user/create_profile',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.post('/profile/create', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	login: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	firstName: '',
	lastName: '',
	dob: {
		day: '',
		month: '',
		year: '',
	},
	genderIdentity: '',
	showGender: false,
	genderInterest: '',
	about: '',
	location: {
		city: '',
		state: '',
		postalCode: '',
	},
	distancePref: '',
	dietType: '',
	favorites: {
		foodTypes: [],
		dish: '',
	},
	profilePhotoPreview: null,
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
		setLogin: (state, action) => {
			state.login = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setConfirmPassword: (state, action) => {
			state.confirmPassword = action.payload;
		},
		setFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		setLastName: (state, action) => {
			state.lastName = action.payload;
		},
		setDOBDay: (state, action) => {
			state.dob.day = action.payload;
		},
		setDOBMonth: (state, action) => {
			state.dob.month = action.payload;
		},
		setDOBYear: (state, action) => {
			state.dob.year = action.payload;
		},
		setGenderIdentity: (state, action) => {
			state.genderIdentity = action.payload;
		},
		setShowGender: (state, action) => {
			state.showGender = action.payload;
		},
		setGenderInterest: (state, action) => {
			state.genderInterest = action.payload;
		},
		setAboutMe: (state, aciton) => {
			state.about = aciton.payload;
		},
		setCity: (state, action) => {
			state.location.city = action.payload;
		},
		setState: (state, action) => {
			state.location.state = action.payload;
		},
		setPostalCode: (state, action) => {
			state.location.postalCode = action.payload;
		},
		setDistancePref: (state, action) => {
			state.distancePref = action.payload;
		},
		setDietType: (state, action) => {
			state.dietType = action.payload;
		},
		setFavFoodTypes: (state, action) => {
			state.favorites.foodTypes = action.payload;
		},
		setFavDish: (state, action) => {
			state.favorites.dish = action.payload;
		},
		setProfilePhotoPreview: (state, action) => {
			state.profilePhotoPreview = action.payload;
		},
		clearAuthData: (state) => {
			state.login = '';
			state.username = '';
			state.email = '';
			state.password = '';
			state.confirmPassword = '';
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
			state.profilePhotoPreview = null;
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
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.user;
				state.email = '';
				state.password = '';
				state.confirmPassword = '';
				state.errors = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(signin.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.userProfile;
				state.login = '';
				state.password = '';
				state.errors = null;
			})
			.addCase(signin.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(createProfile.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.profile;
				state.errors = null;
				state.firstName = '';
				state.lastName = '';
				state.dob = {
					day: null,
					month: null,
					year: null,
				};
				state.genderIdentity = '';
				state.showGender = false;
				state.genderInterest = '';
				state.about = '';
				state.location = {
					city: '',
					state: '',
					postalCode: '',
				};
				state.distancePref = '';
				state.dietType = '';
				state.favorites = {
					foodTypes: [],
					dish: '',
				};
				state.profilePhotoPreview = null;
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	setLogin,
	setEmail,
	setPassword,
	setConfirmPassword,
	setFirstName,
	setLastName,
	setDOBDay,
	setDOBMonth,
	setDOBYear,
	setGenderIdentity,
	setShowGender,
	setGenderInterest,
	setAboutMe,
	setCity,
	setState,
	setPostalCode,
	setDistancePref,
	setDietType,
	setFavFoodTypes,
	setFavDish,
	setProfilePhotoPreview,
	clearAuthData,
	clearUser,
	clearSuccess,
	clearErrors,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
