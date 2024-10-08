import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  message: "",
  error: "",
  success:  "idle" // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const notificationSlice = createSlice({
  name: 'notificationData',
  initialState,
  reducers: {
    SuccessMessage(state, action) {
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    FailureMessage(state, action) {
      console.log("see FailureMessage:", action);
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    clearNotification(state, action) {
      console.log("see notification state:", state)
      state.message = "";
      state.error = "";
      state.success = "idle";
    }
  }
});

// Export actions and reducer
export const { SuccessMessage, FailureMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
