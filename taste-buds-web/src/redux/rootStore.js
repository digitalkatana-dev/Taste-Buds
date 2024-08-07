import { configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	persistStore,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import messageReducer from './slices/messageSlice';

const appPersistConfig = {
	key: 'app',
	storage,
	whitelist: ['selectedProfile'],
};

const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['user'],
};

const messagePersistConfig = {
	key: 'message',
	storage,
	whitelist: ['activeChat'],
};

export const store = configureStore({
	reducer: {
		app: persistReducer(appPersistConfig, appReducer),
		user: persistReducer(userPersistConfig, userReducer),
		message: persistReducer(messagePersistConfig, messageReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});

export const persistor = persistStore(store);
