import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStatusRequest, // New actions for updating user status
  updateUserStatusSuccess,
  updateUserStatusFailure,
} from "../slices/userSlice";
import { RegisterRestaurantSuperAdmin } from "@/app/api/register/RegisterRestaurantSuperAdmin";
import { GetUsers } from "@/app/api/user/GetUsers";
import { DeleteUser } from "@/app/api/user/DeleteUser";
import { UpdateUserStatus } from "@/app/api/user/UpdateUserStatus";
// Worker Saga: Fetch Users
function* fetchUsersSaga(action) {
  // console.log("see restaurantId here inside userSaga", action)
  try {
    const response = yield call(() => GetUsers(action.payload)); // Call the API to fetch users
    yield put(fetchUsersSuccess(response.users)); // Dispatch success action with users data
  } catch (error) {
    yield put(fetchUsersFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Add User
function* addUserSaga(action) {
  // console.log("see the data inside the saga:", action);
  try {
    const response = yield call(() =>
      RegisterRestaurantSuperAdmin(action.payload)
    ); // Call API to add user
    yield put(addUserSuccess(response.data)); // Dispatch success action with added user
  } catch (error) {
    yield put(addUserFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Delete User
function* deleteUserSaga(action) {
  let response;
  try {
    console.log("inside delete request saga: ", action);
    // Assuming there's an API function for deleting a user
    response = yield call(() => DeleteUser(action.payload)); // Call API to delete user
    console.log("see deleted response:", response);
    yield put(deleteUserSuccess(response)); // Dispatch success action with user ID
  } catch (error) {
    yield put(deleteUserFailure(response)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Update User Status
function* updateUserStatusSaga(action) {
  console.log("see action in updateUserStatusSaga:", action)
  let response;
  try {
     response = yield call(() => UpdateUserStatus(action.payload)); // Call API to update user status
     console.log("see response:", response)
    yield put(updateUserStatusSuccess(response)); // Dispatch success action with updated user status
  } catch (error) {
    yield put(updateUserStatusFailure(response)); // Dispatch failure action if there's an error
  }
}

// Watcher Saga
export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga); // Watch for delete user request
  yield takeLatest(updateUserStatusRequest.type, updateUserStatusSaga); // Watch for status update request

}
