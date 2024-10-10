import React, { useEffect } from "react";
import { fetchRestaurantsRequest } from "@/redux/slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import Restaurants from "@/components/restaurants/Restaurants";
import { Box, Typography } from '@mui/material';

const AllRestaurant = () => {
  const dispatch = useDispatch();
  // const restaurants = useSelector((state) => state?.restaurants?.restaurants);
   const restaurants = []
  const restaurantsInitially = useSelector((state) => state?.restaurants);
  console.log("see  restaurantsInitially:", restaurantsInitially)
  console.log("see restaurants :", restaurants)
  
  useEffect(() => {
    dispatch(fetchRestaurantsRequest());
  }, [dispatch]);

  return (
    restaurants && restaurants.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "start",
          gap: 3,
          overflowX: "auto",
          padding: 2,
          marginLeft: { 
            xs: 1.5, // Add space from the left side for small screens
            sm: 2, // Increase the left padding for larger screens
            md: 4,
            lg: 6,
          },
          paddingRight: 0,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },  // Hide scrollbar in WebKit-based browsers
        }}
      >
        {restaurants.map((restaurant) => (
          <Restaurants
            key={restaurant.id}  // Unique key for each restaurant
            name={restaurant.name}
            location={restaurant.location}
            logoUrl={restaurant.logoUrl}
            orders={restaurant.orders.length}  // Assuming you want to display the number of orders
          />
        ))}
      </Box>
    ) : (
      <Typography 
        variant="h6" 
        color="red"
        sx={{ 
          textAlign: "center", 
          padding: 2, 
          fontSize :"30px"
        }}
      >
        No restaurants found. Please check back later!
      </Typography>
    )
  );
  
};

export default AllRestaurant;
