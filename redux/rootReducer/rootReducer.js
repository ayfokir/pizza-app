import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import roleReducer from '../slices/roleSlice';
import pizzaReducer from '../slices/pizzaSlice';
import orderReducer from '../slices/orderSlice';
import toppingReducer from '../slices/toppingSlice';
import  restaurantReducer from '../slices/restaurantSlice'
import notificationReducer from '../slices/notificationSlice'
import headerTtile               from '../slices/headerTtileSlice'
// Combine all the reducers
const rootReducer = combineReducers({
  users: userReducer,
  roles: roleReducer,
  pizza: pizzaReducer,
  orders: orderReducer,
  topping: toppingReducer,
  restaurants:restaurantReducer,
  notification: notificationReducer,
  header:     headerTtile,
});

export default rootReducer;
