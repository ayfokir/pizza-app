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
  updateRoleStatusRequest, // Import the role status update actions
  updateRoleStatusSuccess,
  updateRoleStatusFailure,
} from "../slices/roleSlice"; // Adjust the path based on your folder structure
import { GetRoles } from "@/app/api/role/GetRoles";
import { DeleteRole } from "@/app/api/role/DeleteRole";
// import { UpdateRoleStatus } from "@/app/api/role/UpdateRoleStatus"; // Placeholder for actual API call
import { UpdateUserRoleStatus } from "@/app/api/role/UpdateRoleStatus";
import { SuccessMessage, FailureMessage } from "../slices/notificationSlice";
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
  let response;
  try {
    response = yield call(() => DeleteRole(action.payload)); // Call API to delete role
    console.log("Role deleted successfully:", response);
    yield put(deleteRoleSuccess(response)); // Dispatch success action with deleted role ID
    yield put(SuccessMessage(response)); // Dispatch success action with deleted role ID

  } catch (error) {
    yield put(deleteRoleFailure(response)); // Dispatch failure action if there's an error
    yield put(FailureMessage(response)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Update Role Status
function* updateRoleStatusSaga(action) {
  const { roleId, newStatus } = action.payload;
  console.log("see the status updateRoleStatusSaga:", action)
  let response
  try {
    // Call API to update role status
     response = yield call(() => UpdateUserRoleStatus({roleId, newStatus})); // Replace with actual API function
    console.log("Role status updated successfully:", response);

    // Dispatch success action with updated role status
    yield put(updateRoleStatusSuccess(response));
    yield put(SuccessMessage(response));
  } catch (error) {
    // Dispatch failure action if the update fails
    yield put(updateRoleStatusFailure(response));
    yield put(FailureMessage(response));
  }
}

// Watcher Saga: Watch for role-related actions
function* roleSaga() {
  yield takeLatest(fetchRolesRequest.type, fetchRolesSaga); // Watch for fetch roles request
  // yield takeLatest(addRoleRequest.type, addRoleSaga); // Watch for add role request
  yield takeLatest(deleteRoleRequest.type, deleteRoleSaga); // Watch for delete role request
  yield takeLatest(updateRoleStatusRequest.type, updateRoleStatusSaga); // Watch for role status update request
}

export default roleSaga;
