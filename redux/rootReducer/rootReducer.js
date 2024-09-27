import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import roleReducer from '../slices/roleSlice';
import pizzaReducer from '../slices/pizzaSlice';
import orderReducer from '../slices/orderSlice';
import toppingReducer from '../slices/toppingSlice';
import  restaurantReducer from '../slices/restaurantSlice'

// Combine all the reducers
const rootReducer = combineReducers({
  user: userReducer,
  role: roleReducer,
  pizza: pizzaReducer,
  order: orderReducer,
  topping: toppingReducer,
  restaurant:restaurantReducer
});

export default rootReducer;
