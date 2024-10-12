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
  let restaurantId = action.payload
  try {
    const response = yield call(() => GetOrders(restaurantId)); // Fetch orders from API
    console.log("see the orders inside order saga:", response);
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
    console.log("see the update response inside updateOrderSaga:", response);
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
