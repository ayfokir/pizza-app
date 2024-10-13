import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

// Define the initial state
const initialState = {
  title: "Orders",  // Initial state for the header title
};

const headerSlice = createSlice({
  name: 'headerData',
  initialState,
  reducers: {
    setHeaderTitle(state, action) {
        console.log("see the tiele inside headere slice:", action)
      state.title = action.payload; // Set the header title
    },
    clearHeaderTitle(state) {
      state.title = ""; // Clear the header title
    },
  },
});

// Export actions and reducer
export const { setHeaderTitle, clearHeaderTitle } = headerSlice.actions;
export default headerSlice.reducer;
