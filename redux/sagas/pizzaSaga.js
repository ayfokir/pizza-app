import { call, put, takeLatest } from 'redux-saga/effects';
import { GetPizzas } from '@/app/api/pizza/GetPizzas';
import {fetchPizzasRequest, fetchPizzasSuccess, fetchPizzasFailure, addPizzaRequest, addPizzaSuccess, addPizzaFailure } from '../slices/pizzaSlice';

// Worker Saga: Fetch Pizzas
function* fetchPizzasSaga() {
  try {
    const response = yield call(() => GetPizzas()); // Fetch pizzas from API
    console.log("see pizza inside saga:", response.pizzas)
    yield put(fetchPizzasSuccess(response.pizzas)); // Dispatch success action with pizzas data
  } catch (error) {
    yield put(fetchPizzasFailure(error.message)); // Dispatch failure action if there's an error
  }
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
  yield takeLatest(fetchPizzasRequest.type, fetchPizzasSaga);
  // yield takeLatest(addPizza.type, addPizzaSaga);
}

export default pizzaSaga;
