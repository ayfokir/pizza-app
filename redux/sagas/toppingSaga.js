import { call, put, takeLatest } from 'redux-saga/effects';
// import { fetchToppingsAPI, addToppingAPI } from '../api/toppingApi'; // Assuming these API calls are defined elsewhere
import { fetchToppingsRequest, fetchToppingsSuccess, fetchToppingFailure, addToppingRequest, addToppingSuccess, addToppingFailure  } from '../slices/toppingSlice';
import { GetToppings } from "@/app/api/topping/GetToppings";

// Worker Saga: Fetch Toppings
function* fetchToppingsSaga(action) {
  let restaurantId = action.payload
  console.log("see action inside the fetchToppingsSaga", action)
  let response;
  try {
     response = yield call( () =>  GetToppings(restaurantId)); // Fetch toppings from API
    console.log("see all toppings:", response)
    yield put(fetchToppingsSuccess(response.toppings)); // Dispatch success action with toppings data
  } catch (error) {
    yield put(fetchToppingFailure(error.message)); // Dispatch failure action if there's an error
  }
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
  yield takeLatest(fetchToppingsRequest.type, fetchToppingsSaga);
  // yield takeLatest(addToppingRequest.type, addToppingSaga);
}

export default toppingSaga;
