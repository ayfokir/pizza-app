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
      state.error = null;
    },
    fetchRolesFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addRoleRequest: (state, action) => {
      state.status = 'loading';
    },
    addRoleSuccess: (state, action) => {
      state.status = 'succeeded';
      state.roles.push(action.payload);
      state.error = null;
    },
    addRoleFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteRoleRequest: (state, action) => {
      console.log("see the id inside the the slice, deleteRoleRequest action:", action)
      state.status = 'loading';
    },
    deleteRoleSuccess: (state, action) => {
      state.status = 'succeeded';
      state.roles = state.roles.filter(role => role.id !== action.payload);
      state.error = null;
    },
    deleteRoleFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchRolesRequest,
  fetchRolesSuccess,
  fetchRolesFailure,
  addRoleRequest,
  addRoleSuccess,
  addRoleFailure,
  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
