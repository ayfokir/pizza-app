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
      state.status = 'succeeded';
      state.pizzas = action.payload;
    },
    addPizzaRequest: (state, action) => {
      state.status = 'loading';
    },
    addPizzaSuccess: (state, action) => {
      state.status = 'succeeded';
      state.pizzas.push(action.payload);
    },
  },
});

export const {
  fetchPizzasRequest,
  fetchPizzasSuccess,
  addPizzaRequest,
  addPizzaSuccess,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
