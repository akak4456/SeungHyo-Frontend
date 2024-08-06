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
	whitelist: ['authToken'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
