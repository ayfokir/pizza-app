import { all, fork } from 'redux-saga/effects';
import userSaga from '../sagas/userSaga';
import roleSaga from '../sagas/roleSaga';
import pizzaSaga from '../sagas/pizzaSaga';
import orderSaga from '../sagas/orderSaga';
import toppingSaga from '../sagas/toppingSaga';
import restaurantSaga from '../sagas/restaurantSaga';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(roleSaga),
    fork(pizzaSaga),
    fork(orderSaga),
    fork(toppingSaga),
    fork(restaurantSaga),
  ]);
}
