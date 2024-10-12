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
      let existingOrder =  state.orders.find((order) => order.id == action.payload.id)
      if(existingOrder) {
        existingOrder.status = action.payload.status;
      }
      // state.error = null;
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
