import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  status: 'idle',
  error: null,
  message: ""
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
      state.roles = action.payload.userRoles;
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
      console.log("see  state of role:", state)
      console.log("see action inside deleteRoleSuccess slice", action)
      state.status = 'succeeded';
      state.roles = state.roles.filter(role => role.id !== action.payload.roleId);
      state.message = action.payload.message;
      state.error = null;
    },
    deleteRoleFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
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
