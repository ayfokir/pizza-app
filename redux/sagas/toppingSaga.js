import { call, put, takeLatest } from 'redux-saga/effects';
// import { fetchToppingsAPI, addToppingAPI } from '../api/toppingApi'; // Assuming these API calls are defined elsewhere
import { fetchToppings, addTopping, fetchToppingsSuccess, fetchToppingsFailure, addToppingSuccess, addToppingFailure } from '../slices/toppingSlice';

// Worker Saga: Fetch Toppings
function* fetchToppingsSaga() {
  // try {
  //   const response = yield call(fetchToppingsAPI); // Fetch toppings from API
  //   yield put(fetchToppingsSuccess(response.data)); // Dispatch success action with toppings data
  // } catch (error) {
  //   yield put(fetchToppingsFailure(error.message)); // Dispatch failure action if there's an error
  // }
}

// Worker Saga: Add Topping
function* addToppingSaga(action) {
  // try {
  //   const response = yield call(addToppingAPI, action.payload); // Call API to add new topping
  //   yield put(addToppingSuccess(response.data)); // Dispatch success action with the added topping
  // } catch (error) {
  //   yield put(addToppingFailure(error.message)); // Dispatch failure action if there's an error
  // }
}

// Watcher Saga: Watch for topping-related actions
function* toppingSaga() {
  // yield takeLatest(fetchToppings.type, fetchToppingsSaga);
  // yield takeLatest(addTopping.type, addToppingSaga);
}

export default toppingSaga;
