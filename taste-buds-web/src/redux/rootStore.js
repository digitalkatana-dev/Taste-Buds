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
import notificationReducer from './slices/notificationSlice';

const appPersistConfig = {
	key: 'app',
	storage,
	whitelist: ['selectedProfile'],
};

const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['activeUser'],
};

const messagePersistConfig = {
	key: 'message',
	storage,
	whitelist: ['activeChat', 'socketId'],
};

export const store = configureStore({
	reducer: {
		app: persistReducer(appPersistConfig, appReducer),
		user: persistReducer(userPersistConfig, userReducer),
		message: persistReducer(messagePersistConfig, messageReducer),
		notification: notificationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});

export const persistor = persistStore(store);
