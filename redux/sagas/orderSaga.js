import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  fetchOrdersRequest, 
  fetchOrdersSuccess, 
  fetchOrdersFailure, 
  updateOrderRequest, 
  updateOrderSuccess, 
  updateOrderFailure 
} from '../slices/orderSlice';
import { GetOrders } from '@/app/api/orders/GetOrders';
import { updateOrderStatus } from '@/app/api/orders/updateOrderStatus';
import { SuccessMessage, FailureMessage } from '../slices/notificationSlice';
// Worker Saga: Fetch Orders
function* fetchOrdersSaga(action) {
  let restaurantId;
  let filterCriteria = {};

  // Check if payload is a number (indicating only restaurantId is provided)
  if (typeof action.payload === 'number') {
    restaurantId = action.payload;
  } else if (typeof action.payload === 'object') {
    // If payload is an object, destructure restaurantId and filterCriteria from it
    restaurantId = action.payload.restaurantId;
    filterCriteria = action.payload.filterCriteria || {}; // Default to empty object if undefined
  }
  console.log("see actions inside fetchOrdersSaga :", action)
  try {
    const response = yield call(() => GetOrders(restaurantId, filterCriteria)); // Fetch orders from API
    // console.log("see the orders inside order saga:", response);
    yield put(fetchOrdersSuccess(response.orderPizzas)); // Dispatch success action with orders data
  } catch (error) {
    yield put(fetchOrdersFailure(error.message)); // Dispatch failure action if there's an error
  }
}

// Worker Saga: Update Order
function* updateOrderSaga(action) {
  let response
  try {
     response = yield call(() => updateOrderStatus(action.payload)); // Call API to update order status
    // console.log("see the update response inside updateOrderSaga:", response);
    yield put(updateOrderSuccess(response.updatedOrder)); // Dispatch success action with updated order
    yield put(SuccessMessage(response)); // Dispatch success action with updated order

  } catch (error) {
    yield put(updateOrderFailure(response)); // Dispatch failure action if there's an error
    yield put(FailureMessage(response)); // Dispatch failure action if there's an error
  }
}

// Watcher Saga: Watch for order-related actions
function* orderSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeLatest(updateOrderRequest.type, updateOrderSaga); // Watch for update order request
}

export default orderSaga;
