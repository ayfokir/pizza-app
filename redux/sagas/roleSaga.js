import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchRolesRequest,
  fetchRolesSuccess,
  fetchRolesFailure,
  addRoleRequest,
  addRoleSuccess,
  addRoleFailure,
  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,
} from "../slices/roleSlice"; // Adjust path based on where your slice is located
import { GetRoles } from "@/app/api/role/GetRoles";
// import { AddRole } from '@/app/api/roles/AddRole';   // Replace with actual API path
import { DeleteRole } from "@/app/api/role/DeleteRole";
// Worker Saga: Fetch Roles
function* fetchRolesSaga() {
  try {
    const response = yield call(() => GetRoles()); // Fetch roles from API
    console.log("Roles fetched successfully:", response);
    yield put(fetchRolesSuccess(response)); // Dispatch success action with roles data
  } catch (error) {
    yield put(fetchRolesFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// // Worker Saga: Add Role
// function* addRoleSaga(action) {
//   try {
//     const response = yield call(() => AddRole(action.payload)); // Call API to add a new role
//     console.log('Role added successfully:', response);
//     yield put(addRoleSuccess(response.newRole)); // Dispatch success action with new role data
//   } catch (error) {
//     yield put(addRoleFailure(error.message)); // Dispatch failure action if there's an error
//   }
// }

// Worker Saga: Delete Role
function* deleteRoleSaga(action) {
  console.log("see the id inside saga:", action);
  let response
  try {
     response = yield call(() => DeleteRole(action.payload)); // Call API to delete role
    console.log("Role deleted successfully:", response);
    yield put(deleteRoleSuccess(response)); // Dispatch success action with deleted role ID
  } catch (error) {
    yield put(deleteRoleFailure(response)); // Dispatch failure action if there's an error
  }
}

// Watcher Saga: Watch for role-related actions
function* roleSaga() {
  yield takeLatest(fetchRolesRequest.type, fetchRolesSaga); // Watch for fetch roles request
  // yield takeLatest(addRoleRequest.type, addRoleSaga); // Watch for add role request
  yield takeLatest(deleteRoleRequest.type, deleteRoleSaga); // Watch for delete role request
}

export default roleSaga;
