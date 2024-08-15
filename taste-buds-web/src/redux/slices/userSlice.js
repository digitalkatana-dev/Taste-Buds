import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { setPhotoDialogType, setWarningOpen, setWarningType } from './appSlice';
import { socket, emitNotification } from '../../util/socket';
import { shuffleArray } from '../../util/helpers';
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

export const getProfile = createAsyncThunk(
	'users/get_profile',
	async (data, { rejectWithValue }) => {
		try {
			const res = await budsApi.get(`/profiles/?id=${data}`);
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

export const updateUserProfile = createAsyncThunk(
	'users/update_user_profile',
	async (updateData, { rejectWithValue }) => {
		const { profileId, ...others } = updateData;
		try {
			const res = await budsApi.put(`/profiles/${profileId}/update`, others);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateMatches = createAsyncThunk(
	'users/update_matches',
	async (updateData, { rejectWithValue }) => {
		const { profileId, ...others } = updateData;
		try {
			const res = await budsApi.put(`/profiles/${profileId}/update`, others);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateBlocked = createAsyncThunk(
	'users/update_blocked',
	async (updateData, { rejectWithValue, dispatch }) => {
		const { profileId, ...others } = updateData;
		try {
			const res = await budsApi.put(`/profiles/${profileId}/update`, others);
			const { success } = res.data;
			if (success) {
				dispatch(setWarningOpen(false));
				dispatch(setWarningType(''));
			}
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const manageFoodPorn = createAsyncThunk(
	'users/manage_food_porn',
	async (data, { rejectWithValue, dispatch }) => {
		const profileId = data.get('profileId');
		try {
			const res = await budsApi.put(`/profiles/${profileId}/food-porn`, data);
			const { success } = res.data;
			if (success) dispatch(setPhotoDialogType(''));
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteAccount = createAsyncThunk(
	'users/delete_account',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await budsApi.delete(`/profiles/${data}/delete`);
			const { success } = res.data;
			if (success) dispatch(logout());
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
	photoPreview: null,
	communication: {
		email: true,
		sms: false,
		voice: false,
		snail: false,
	},
	activeUser: null,
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
		setPhotoPreview: (state, action) => {
			state.photoPreview = action.payload;
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
			socket.emit('logout');
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
			state.photoPreview = null;
			state.communication = {
				email: true,
				sms: false,
				voice: false,
				snail: false,
			};
			state.activeUser = null;
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
				state.activeUser = action.payload.user;
				socket.emit('setup', action.payload.user._id);
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
				state.activeUser = action.payload.userProfile;
				socket.emit('setup', action.payload.user._id);
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
				state.activeUser = action.payload.profile;
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
				state.photoPreview = null;
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getProfile.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.activeUser = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
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
				state.success = 'Gendered retrieved successfully!';
				state.allUsers = shuffleArray(action.payload);
			})
			.addCase(getGenderedBuds.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.activeUser = action.payload.updatedProfile;
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
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateMatches.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateMatches.fulfilled, (state, action) => {
				state.loading = false;
				state.success = 'Matches updated successfully!';
				state.activeUser = action.payload.updatedProfile;
			})
			.addCase(updateMatches.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateBlocked.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateBlocked.fulfilled, (state, action) => {
				state.loading = false;
				state.success = 'Blocked updated successfully!';
				state.activeUser = action.payload.updatedProfile;
			})
			.addCase(updateBlocked.rejected, (state, action) => {
				state.loading = false;
				state.errors = null;
			})
			.addCase(manageFoodPorn.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(manageFoodPorn.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.activeUser = action.payload.updated;
				state.photoPreview = null;
			})
			.addCase(manageFoodPorn.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteAccount.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteAccount.rejected, (state, action) => {
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
	setPhotoPreview,
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
