import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './Auth';
import logger from 'redux-logger';
export default configureStore({
	reducer: {
		authToken: tokenReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
