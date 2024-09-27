import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurants: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // fetchRestaurantsRequest: (state) => {
    //   state.status = 'loading';
    // },
    // fetchRestaurantsSuccess: (state, action) => {
    //   state.status = 'succeeded';
    //   state.restaurants = action.payload; // payload is the array of restaurants
    // },
    // fetchRestaurantsFailure: (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.payload; // payload is the error message
    // },
    addRestaurantRequest: (state) => {
      state.status = 'loading';
    },
    addRestaurantSuccess: (state, action) => {
      state.status = 'succeeded';
      state.restaurants.push(action.payload); // payload is the new restaurant object
    },
    addRestaurantFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // payload is the error message
    },
  },
});

// Export actions
export const {
//   fetchRestaurantsRequest,
//   fetchRestaurantsSuccess,
//   fetchRestaurantsFailure,
  addRestaurantRequest,
  addRestaurantSuccess,
  addRestaurantFailure,
} = restaurantSlice.actions;

// Export reducer
export default restaurantSlice.reducer;
