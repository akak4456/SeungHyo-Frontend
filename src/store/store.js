import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './features/header/headerSlice';
export default configureStore({
    reducer: {
        header: headerReducer,
    },
});