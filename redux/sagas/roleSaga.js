import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRolesAPI, addRoleAPI, deleteRoleAPI } from '../api/roleApi'; // Assuming these API calls are defined elsewhere
import { fetchRoles, addRole, deleteRole, fetchRolesSuccess, fetchRolesFailure, addRoleSuccess, addRoleFailure, deleteRoleSuccess, deleteRoleFailure } from '../slices/roleSlice';

// Worker Saga: Fetch Roles
function* fetchRolesSaga() {
  try {
    const response = yield call(fetchRolesAPI); // Fetch roles from API
    yield put(fetchRolesSuccess(response.data)); // Dispatch success action with roles data
  } catch (error) {
    yield put(fetchRolesFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Add Role
function* addRoleSaga(action) {
  try {
    const response = yield call(addRoleAPI, action.payload); // Call API to add new role
    yield put(addRoleSuccess(response.data)); // Dispatch success action with the added role
  } catch (error) {
    yield put(addRoleFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Delete Role
function* deleteRoleSaga(action) {
  try {
    yield call(deleteRoleAPI, action.payload); // Call API to delete role
    yield put(deleteRoleSuccess(action.payload)); // Dispatch success action with role ID to remove
  } catch (error) {
    yield put(deleteRoleFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Watcher Saga: Watch for role-related actions
function* roleSaga() {
  yield takeLatest(fetchRoles.type, fetchRolesSaga);
  yield takeLatest(addRole.type, addRoleSaga);
  yield takeLatest(deleteRole.type, deleteRoleSaga);
}

export default roleSaga;
