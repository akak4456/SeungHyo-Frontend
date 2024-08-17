import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './Auth';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
const reducers = combineReducers({
	authToken: tokenReducer,
});
const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: [''], // accessToken 은 그냥 안 담는 것으로 결정
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
