// slices/selectedPizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPizza: null, // Store the selected pizza details
  status: 'idle',
  error: null,
};

const selectedPizzaSlice = createSlice({
  name: 'selectedPizza',
  initialState,
  reducers: {
    selectPizzaRequest: (state) => {
      state.status = 'loading';
    },
    selectPizzaSuccess: (state, action) => {
      state.status = 'succeeded';
      state.selectedPizza = action.payload; // Store the selected pizza
    },
    selectPizzaFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Store the error message
    },
    clearSelectedPizza: (state) => {
      state.selectedPizza = null; // Clear the selected pizza
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const {
  selectPizzaRequest,
  selectPizzaSuccess,
  selectPizzaFailure,
  clearSelectedPizza, // Export the action to clear the selected pizza
} = selectedPizzaSlice.actions;

export default selectedPizzaSlice.reducer;
