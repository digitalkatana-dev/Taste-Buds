import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import budsApi from '../../api/budsApi';

export const signup = createAsyncThunk(
	'users/signup',
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
	'users/signin',
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
	'users/create_profile',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.post('/profiles/create', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getBuds = createAsyncThunk(
	'users/get_all',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get('/profiles');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getGenderedBuds = createAsyncThunk(
	'users/get_gendered',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/profiles/?gender=${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateMatches = createAsyncThunk(
	'users/update_matches',
	async (data, { rejectWithValue }) => {
		const { profileId, ...others } = data;
		try {
			const res = await budsApi.put(`/profiles/${profileId}/update`, others);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateProfile = createAsyncThunk(
	'users/update_profile',
	async (updateData, { rejectWithValue }) => {
		const { profileId, data } = updateData;
		try {
			const res = await budsApi.put(`/profiles/${profileId}/update`, data);
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
	handle: '',
	email: '',
	password: '',
	confirmPassword: '',
	firstName: '',
	lastName: '',
	dob: {
		month: '',
		day: '',
		year: '',
	},
	genderIdentity: '',
	editIdentity: false,
	showGender: false,
	genderInterest: '',
	editInterest: false,
	about: '',
	editAbout: false,
	location: {
		city: '',
		state: '',
		postalCode: '',
	},
	editLocation: false,
	distancePref: null,
	editDistance: false,
	dietType: '',
	editDiet: false,
	favorites: {
		foodTypes: [],
		dish: '',
	},
	editFavFoods: false,
	editFavDish: false,
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
		setHandle: (state, action) => {
			state.handle = action.payload;
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
		setDOBMonth: (state, action) => {
			state.dob.month = action.payload;
		},
		setDOBDay: (state, action) => {
			state.dob.day = action.payload;
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
		toggleEditIdentity: (state) => {
			state.editIdentity = !state.editIdentity;
		},
		setGenderInterest: (state, action) => {
			state.genderInterest = action.payload;
		},
		toggleEditInterest: (state) => {
			state.editInterest = !state.editInterest;
		},
		setAboutMe: (state, aciton) => {
			state.about = aciton.payload;
		},
		toggleEditAbout: (state) => {
			state.editAbout = !state.editAbout;
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
		toggleEditLocation: (state) => {
			state.editLocation = !state.editLocation;
		},
		setDistancePref: (state, action) => {
			state.distancePref = parseInt(action.payload);
		},
		toggleEditDistance: (state) => {
			state.editDistance = !state.editDistance;
		},
		setDietType: (state, action) => {
			state.dietType = action.payload;
		},
		toggleEditDiet: (state) => {
			state.editDiet = !state.editDiet;
		},
		setFavFoodTypes: (state, action) => {
			state.favorites.foodTypes = action.payload;
		},
		toggleEditFavFoods: (state) => {
			state.editFavFoods = !state.editFavFoods;
		},
		setFavDish: (state, action) => {
			state.favorites.dish = action.payload;
		},
		toggleEditFavDish: (state) => {
			state.editFavDish = !state.editFavDish;
		},
		setProfilePhotoPreview: (state, action) => {
			state.profilePhotoPreview = action.payload;
		},
		populateAbout: (state, action) => {
			state.about = action.payload;
		},
		populateIdentity: (state, action) => {
			state.genderIdentity = action.payload;
		},
		populateInterest: (state, action) => {
			state.genderInterest = action.payload;
		},
		populateLocation: (state, action) => {
			state.location = action.payload;
		},
		populateDistance: (state, action) => {
			state.distancePref = action.payload;
		},
		populateDiet: (state, action) => {
			state.dietType = action.payload;
		},
		populateFoods: (state, action) => {
			state.favorites.foodTypes = action.payload;
		},
		populateDish: (state, action) => {
			state.favorites.dish = action.payload;
		},
		clearAuthData: (state) => {
			state.login = '';
			state.handle = '';
			state.email = '';
			state.password = '';
			state.confirmPassword = '';
			state.errors = null;
		},
		clearUser: (state) => {
			state.firstName = '';
			state.lastName = '';
			state.handle = '';
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
		clearLocation: (state) => {
			state.location = {
				city: '',
				state: '',
				postalCode: '',
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
			state.login = '';
			state.handle = '';
			state.email = '';
			state.password = '';
			state.confirmPassword = '';
			state.firstName = '';
			state.lastName = '';
			state.dob = {
				month: '',
				day: '',
				year: '',
			};
			state.genderIdentity = '';
			state.showGender = false;
			state.editIdentity = false;
			state.genderInterest = '';
			state.editInterest = false;
			state.about = '';
			state.editAbout = false;
			state.location = {
				city: '',
				state: '',
				postalCode: '',
			};
			state.editLocation = false;
			state.distancePref = '';
			state.editDistance = false;
			state.dietType = '';
			state.editDiet = false;
			state.favorites = {
				foodTypes: [],
				dish: '',
			};
			state.editFavFoods = false;
			state.editFavDish = false;
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
				state.handle = '';
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
					month: null,
					day: null,
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
			})
			.addCase(getBuds.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getBuds.fulfilled, (state, action) => {
				state.loading = false;
				state.allUsers = action.payload;
			})
			.addCase(getBuds.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getGenderedBuds.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getGenderedBuds.fulfilled, (state, action) => {
				state.loading = false;
				state.allUsers = action.payload;
			})
			.addCase(getGenderedBuds.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateMatches.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateMatches.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.updatedProfile;
			})
			.addCase(updateMatches.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.updatedProfile;
				state.about = '';
				state.editAbout = false;
				state.genderIdentity = '';
				state.editIdentity = false;
				state.genderInterest = '';
				state.editInterest = false;
				state.location = {
					city: '',
					state: '',
					postalCode: '',
				};
				state.editLocation = false;
				state.distancePref = null;
				state.editDistance = false;
				state.dietType = '';
				state.editDiet = false;
				state.favorites.foodTypes = [];
				state.editFavFoods = false;
				state.favorites.dish = '';
				state.editFavDish = false;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	setLogin,
	setHandle,
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
	toggleEditIdentity,
	setGenderInterest,
	toggleEditInterest,
	setAboutMe,
	toggleEditAbout,
	setCity,
	setState,
	setPostalCode,
	toggleEditLocation,
	setDistancePref,
	toggleEditDistance,
	setDietType,
	toggleEditDiet,
	setFavFoodTypes,
	setFavDish,
	toggleEditFavFoods,
	toggleEditFavDish,
	setProfilePhotoPreview,
	populateAbout,
	populateIdentity,
	populateInterest,
	populateLocation,
	populateDistance,
	populateDiet,
	populateFoods,
	populateDish,
	clearAuthData,
	clearUser,
	clearLocation,
	clearSuccess,
	clearErrors,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
