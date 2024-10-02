import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, addUserRequest, addUserSuccess, addUserFailure, deleteUserRequest, deleteUserSuccess, deleteUserFailure } from '../slices/userSlice'; 
import { RegisterRestaurantSuperAdmin } from '@/app/api/register/RegisterRestaurantSuperAdmin';
// Import the mock API functions for fetching and deleting users
// import api from '../api'; // Uncomment and adjust when you have the actual API
import { GetUsers } from '@/app/api/user/GetUsers';
import { DeleteUser } from '@/app/api/user/DeleteUser';
// Worker Saga: Fetch Users
function* fetchUsersSaga(action) {
  // const { restaurantId } = action.payload; // Extract restaurantId from the action

  console.log("see restaurantId here inside userSaga", action)
  try {
    const response = yield call(() => GetUsers(action.payload)); // Call the API to fetch users
    yield put(fetchUsersSuccess(response.users)); // Dispatch success action with users data
  } catch (error) {
    yield put(fetchUsersFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Add User
function* addUserSaga(action) {
  console.log("see the data inside the saga:", action);
  try {
    const response = yield call(() => RegisterRestaurantSuperAdmin(action.payload)); // Call API to add user
    yield put(addUserSuccess(response.data)); // Dispatch success action with added user
  } catch (error) {
    yield put(addUserFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Delete User
function* deleteUserSaga(action) {
  try {
    // Assuming there's an API function for deleting a user
    const response = yield call(() => DeleteUser(action.payload)); // Call API to delete user
    console.log("see deleted response:", response)
    yield put(deleteUserSuccess(response.data)); // Dispatch success action with user ID
  } catch (error) {
    yield put(deleteUserFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Watcher Saga
export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga); // Watch for delete user request
}
