import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, addUserRequest, addUserSuccess } from '../slices/userSlice';
import api from '../api'; // Mock API function
import { RegisterRestaurantSuperAdmin } from '@/app/api/register/RegisterRestaurantSuperAdmin';

function* fetchUsersSaga() {
  try {
    const response = yield call(api.fetchUsers); // API call
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* addUserSaga(action) {
  try {
    const response = yield call(() => RegisterRestaurantSuperAdmin(action.payload));
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
}
