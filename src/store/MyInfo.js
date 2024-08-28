import { createSlice } from '@reduxjs/toolkit';

export const myInfoSlice = createSlice({
	name: 'myInfo',
	initialState: {
		id: '',
	},
	reducers: {
		SET_MY_ID: (state, action) => {
			state.id = action.payload;
		},
	},
});

export const { SET_MY_ID } = myInfoSlice.actions;
export default myInfoSlice.reducer;
