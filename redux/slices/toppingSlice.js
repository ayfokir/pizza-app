import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toppings: [],
  status: 'idle',
  error: null,
};

const toppingSlice = createSlice({
  name: 'topping',
  initialState,
  reducers: {
    fetchToppingsRequest: (state) => {
      state.status = 'loading';
    },
    fetchToppingsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.toppings = action.payload;
    },
    addToppingRequest: (state, action) => {
      state.status = 'loading';
    },
    addToppingSuccess: (state, action) => {
      state.status = 'succeeded';
      state.toppings.push(action.payload);
    },
  },
});

export const {
  fetchToppingsRequest,
  fetchToppingsSuccess,
  addToppingRequest,
  addToppingSuccess,
} = toppingSlice.actions;

export default toppingSlice.reducer;
