import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, addUserRequest, addUserSuccess } from '../slices/userSlice';
import api from '../api'; // Mock API function

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
    const response = yield call(api.addUser, action.payload);
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
}
