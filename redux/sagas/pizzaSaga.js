import { call, put, takeLatest } from 'redux-saga/effects';
// import { fetchPizzasAPI, addPizzaAPI } from '../api/pizzaApi'; // Assuming these API calls are defined elsewhere
import { fetchPizzas, addPizza, fetchPizzasSuccess, fetchPizzasFailure, addPizzaSuccess, addPizzaFailure } from '../slices/pizzaSlice';

// Worker Saga: Fetch Pizzas
function* fetchPizzasSaga() {
  // try {
  //   const response = yield call(fetchPizzasAPI); // Fetch pizzas from API
  //   yield put(fetchPizzasSuccess(response.data)); // Dispatch success action with pizzas data
  // } catch (error) {
  //   yield put(fetchPizzasFailure(error.message)); // Dispatch failure action if there's an error
  // }
}

// Worker Saga: Add Pizza
function* addPizzaSaga(action) {
  // try {
  //   const response = yield call(addPizzaAPI, action.payload); // Call API to add new pizza
  //   yield put(addPizzaSuccess(response.data)); // Dispatch success action with the added pizza
  // } catch (error) {
  //   yield put(addPizzaFailure(error.message)); // Dispatch failure action if there's an error
  // }
}

// Watcher Saga: Watch for pizza-related actions
function* pizzaSaga() {
  // yield takeLatest(fetchPizzas.type, fetchPizzasSaga);
  // yield takeLatest(addPizza.type, addPizzaSaga);
}

export default pizzaSaga;
