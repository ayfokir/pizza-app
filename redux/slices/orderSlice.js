import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.status = 'loading';
    },
    fetchOrdersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orders = action.payload;
    },
    addOrderRequest: (state, action) => {
      state.status = 'loading';
    },
    addOrderSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orders.push(action.payload);
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  addOrderRequest,
  addOrderSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
