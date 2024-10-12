import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toppings: [],
  status: 'idle',
  error: null,
  message: ""
};

const toppingSlice = createSlice({
  name: 'topping',
  initialState,
  reducers: {
    fetchToppingsRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchToppingsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.toppings = action.payload;
    },
    fetchToppingFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addToppingRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    addToppingSuccess: (state, action) => {
      state.status = 'succeeded';
      state.toppings.push(action.payload);
    },
    addToppingFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchToppingsRequest,
  fetchToppingsSuccess,
  fetchToppingFailure,
  addToppingRequest,
  addToppingSuccess,
  addToppingFailure,
} = toppingSlice.actions;

export default toppingSlice.reducer;
