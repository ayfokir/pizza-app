import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  restaurants: [],
  selectedRestaurantId: null, // Changed from array to null to store a single restaurant ID
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    fetchRestaurantsRequest: (state) => {
      state.status = 'loading';
      state.error = null;        // Reset error on new request
    },
    fetchRestaurantsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.restaurants = action.payload; // payload is the array of restaurants
    },
    fetchRestaurantsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // payload is the error message
    },
    addRestaurantRequest: (state) => {
      state.status = 'loading';
      state.error = null;        // Reset error for this action
    },
    addRestaurantSuccess: (state, action) => {
      state.status = 'succeeded';
      state.restaurants.push(action.payload); // payload is the new restaurant object
    },
    addRestaurantFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // payload is the error message
    },

    // Action to select a restaurant by its ID
    selectRestaurant: (state, action) => {
      state.selectedRestaurantId = action.payload; // payload is the selected restaurant ID
    },
  },
});

// Export actions
export const {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
  addRestaurantRequest,
  addRestaurantSuccess,
  addRestaurantFailure,
  selectRestaurant, // Export the new action
} = restaurantSlice.actions;

// Export reducer
export default restaurantSlice.reducer;
