import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.status = 'loading';
    },
    fetchUsersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addUserRequest: (state, action) => {
      state.status = 'loading';
    },
    addUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => { // Added addUserFailure
      state.status = 'failed';
      state.error = action.payload; // Set the error message when adding a user fails
    },
    deleteUserRequest: (state, action) => {
      state.status = 'loading';
    },
    deleteUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set the error message when deletion fails
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure, // Exporting the addUserFailure action
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure, // Exporting the deleteUserFailure action
} = userSlice.actions;

export default userSlice.reducer;
