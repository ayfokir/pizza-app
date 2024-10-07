import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: '',
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
    addUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteUserRequest: (state, action) => {
      state.status = 'loading';
    },
    deleteUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
      state.users = state.users.filter(user => user.id !== action.payload.userId);
    },
    deleteUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    },
    // New reducer for updating user status
    updateUserStatusRequest: (state) => {
      state.status = 'loading';
    },
    updateUserStatusSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = `${action.payload.message}`
      const { userId, newStatus } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.status = newStatus; // Update the user's status
      }
    },
    updateUserStatusFailure: (state, action) => {
      state.status = 'failed';
      state.error = `${action.payload.error}`
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStatusRequest,   // Export the new actions
  updateUserStatusSuccess,
  updateUserStatusFailure,
} = userSlice.actions;

export default userSlice.reducer;
