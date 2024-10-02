import { call, put, takeLatest } from 'redux-saga/effects';
import { GetRestaurants } from '@/app/api/restaurant/GetRestaurant';
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
  addRestaurantRequest,
  addRestaurantSuccess,
  addRestaurantFailure,
} from '../slices/restaurantSlice';

// Worker Saga: Fetch Restaurants
function* fetchRestaurantsSaga() {
  try {
    const response = yield call(() => GetRestaurants()); // Fetch restaurants from API
    console.log("see the resturant data inside saga:", response)
    yield put(fetchRestaurantsSuccess(response.restaurants)); // Dispatch success action with restaurants data
  } catch (error) {
    yield put(fetchRestaurantsFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Add Restaurant
function* addRestaurantSaga(action) {
  // try {
  //   const response = yield call(addRestaurantAPI, action.payload); // Call API to add new restaurant
  //   yield put(addRestaurantSuccess(response.data)); // Dispatch success action with the added restaurant
  // } catch (error) {
  //   yield put(addRestaurantFailure(error.message)); // Dispatch failure action if there's an error
  // }
}

// Watcher Saga: Watch for restaurant-related actions
function* restaurantSaga() {
  yield takeLatest(fetchRestaurantsRequest.type, fetchRestaurantsSaga);
  // yield takeLatest(addRestaurantRequest.type, addRestaurantSaga);
}

export default restaurantSaga;
