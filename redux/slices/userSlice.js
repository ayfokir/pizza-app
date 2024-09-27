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
    deleteUserRequest: (state, action) => {
      state.status = 'loading';
    },
    deleteUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  deleteUserRequest,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
