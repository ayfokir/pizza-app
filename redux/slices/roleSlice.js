import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [], // Each role will have a structure like { id, name, status }
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
      // Assign a default status of 'idle' to each role
      // console.log("see inside fetchRolesSuccess:", action)
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
      state.roles.push({ ...action.payload, status: 'idle' });
      state.error = null;
    },
    addRoleFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteRoleRequest: (state, action) => {
      console.log("see the id inside the the slice, deleteRoleRequest action:", action);
      state.status = 'loading';
    },
    deleteRoleSuccess: (state, action) => {
      console.log("see  state of role:", state);
      console.log("see action inside deleteRoleSuccess slice", action);
      state.status = 'succeeded';
      state.roles = state.roles.filter(role => role.id !== action.payload.roleId);
      state.message = action.payload.message;
      state.error = null;
    },
    deleteRoleFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    },
    // Action to initiate the status update
    updateRoleStatusRequest: (state, action) => {
      const { roleId } = action.payload;
      const role = state.roles.find(role => role.id === roleId);
      if (role) {
        role.status = 'loading';
      }
    },
    // Action to handle success of status update
    updateRoleStatusSuccess: (state, action) => {
      const { roleId, newStatus, message } = action.payload;
      const role = state.roles.find(role => role.id === roleId);
      if (role) {
        role.status = newStatus;
      }
      state.status = 'succeeded';
      state.message = `${message} ${newStatus}`;
      state.error = null;
    },
    // Action to handle failure of status update
    updateRoleStatusFailure: (state, action) => {
      const { roleId, error } = action.payload;
      const role = state.roles.find(role => role.id === roleId);
      if (role) {
        role.status = 'failed';  // Set the role's status to 'failed' in case of error
      }
      state.error = error;
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
  updateRoleStatusRequest, // Export the request action
  updateRoleStatusSuccess, // Export the success action
  updateRoleStatusFailure, // Export the failure action
} = roleSlice.actions;

export default roleSlice.reducer;
