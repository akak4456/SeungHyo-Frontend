import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isDropdownShown: false,
    },
    reducers: {
        show: (state) => {
            state.isDropdownShown = true;
        },
        hide: (state) => {
            state.isDropdownShown = false;
        },
    },
})

export const {show, hide} = headerSlice.actions;

export default headerSlice.reducer;