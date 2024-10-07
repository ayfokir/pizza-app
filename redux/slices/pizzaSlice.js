// slices/pizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  selectedPizzaId: null,
  status: 'idle',
  error: null,
  orderStatus: 'idle',  // New state for order status
  orderError: null,     // New state for order error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    fetchPizzasRequest: (state) => {
      state.status = 'loading';
    },
    fetchPizzasSuccess: (state, action) => {
      state.status = 'succeeded';
      state.pizzas = action.payload;
    },
    fetchPizzasFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addPizzaRequest: (state) => {
      state.status = 'loading';
    },
    addPizzaSuccess: (state, action) => {
      state.status = 'succeeded';
      state.pizzas.push(action.payload);
    },
    addPizzaFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    orderPizzaRequest: (state) => {  // New order request action
      state.orderStatus = 'loading';
    },
    orderPizzaSuccess: (state, action) => {  // New order success action
      state.orderStatus = 'succeeded';
      state.selectedPizzaId  = action.payload
    },
    orderPizzaFailure: (state, action) => {  // New order failure action
      state.orderStatus = 'failed';
      state.orderError = action.payload;
    },
  },
});

export const {
  fetchPizzasRequest,
  fetchPizzasSuccess,
  fetchPizzasFailure,
  addPizzaRequest,
  addPizzaSuccess,
  addPizzaFailure,
  orderPizzaRequest,
  orderPizzaSuccess,
  orderPizzaFailure,  // Export new actions
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
