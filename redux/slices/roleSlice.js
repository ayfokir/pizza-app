import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  status: 'idle',
  error: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    fetchRolesRequest: (state) => {
      state.status = 'loading';
    },
    fetchRolesSuccess: (state, action) => {
      state.status = 'succeeded';
      state.roles = action.payload;
    },
    addRoleRequest: (state, action) => {
      state.status = 'loading';
    },
    addRoleSuccess: (state, action) => {
      state.status = 'succeeded';
      state.roles.push(action.payload);
    },
    deleteRoleRequest: (state, action) => {
      state.status = 'loading';
    },
    deleteRoleSuccess: (state, action) => {
      state.status = 'succeeded';
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
  },
});

export const {
  fetchRolesRequest,
  fetchRolesSuccess,
  addRoleRequest,
  addRoleSuccess,
  deleteRoleRequest,
  deleteRoleSuccess,
} = roleSlice.actions;

export default roleSlice.reducer;
