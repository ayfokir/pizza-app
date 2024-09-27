import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  message: "",
  error: "",
  success: false
};

const notificationSlice = createSlice({
  name: 'notificationData',
  initialState,
  reducers: {
    SuccessMessage(state, action) {
      console.log("see SuccessMessage:", action);
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    FailureMessage(state, action) {
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.success = false;
    }
  }
});

// Export actions and reducer
export const { SuccessMessage, FailureMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
