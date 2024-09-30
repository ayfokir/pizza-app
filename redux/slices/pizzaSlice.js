// slices/pizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  status: 'idle',
  error: null,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    fetchPizzasRequest: (state) => {
      state.status = 'loading';
    },
    fetchPizzasSuccess: (state, action) => {
      state.status = true;
      state.pizzas = action.payload;
    },
    fetchPizzasFailure: (state, action) => {  // New failure action
      state.status = false;
      state.error = action.payload;  // Store the error message
    },
    addPizzaRequest: (state, action) => {
      state.status = 'loading';
    },
    addPizzaSuccess: (state, action) => {
      state.status = true;
      state.pizzas.push(action.payload);
    },
    addPizzaFailure: (state, action) => {  // New failure action
      state.status = false;
      state.error = action.payload;  // Store the error message
    },
  },
});

export const {
  fetchPizzasRequest,
  fetchPizzasSuccess,
  fetchPizzasFailure,  // Export the new action
  addPizzaRequest,
  addPizzaSuccess,
  addPizzaFailure,  // Export the new action
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
