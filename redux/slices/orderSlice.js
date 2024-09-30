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
    // Fetch Orders
    fetchOrdersRequest: (state) => {
      state.status = 'loading';
      state.error = null; // Reset error on new request
    },
    fetchOrdersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orders = action.payload;
      state.error = null; // Reset error on successful fetch
    },
    fetchOrdersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set error message from action payload
    },
    // Add Order
    addOrderRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    addOrderSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orders.push(action.payload); // Add new order to the list
      state.error = null;
    },
    addOrderFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Update Order
    updateOrderRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    updateOrderSuccess: (state, action) => {
      state.status = 'succeeded';
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload; // Update the specific order
      }
      state.error = null;
    },
    updateOrderFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrderRequest,
  addOrderSuccess,
  addOrderFailure,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
