import React, { useEffect } from "react";
import { fetchRestaurantsRequest } from "@/redux/slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import Restaurants from "@/components/restaurants/Restaurants";
import { Box } from '@mui/material';

const AllRestaurant = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state?.restaurants?.restaurants);
  useEffect(() => {
    dispatch(fetchRestaurantsRequest());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        mx: 5,
        gap: 3,
        overflowX: "scroll",
        padding: 2,
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in WebKit-based browsers
      }}
    >
      {restaurants?.map((restaurant) => (
        <Restaurants
          key={restaurant.id}  // Unique key for each restaurant
          name={restaurant.name}
          location={restaurant.location}
          logoUrl={restaurant.logoUrl}
          orders={restaurant.orders.length}  // Assuming you want to display the number of orders
        />
      ))}
    </Box>
  );
};

export default AllRestaurant;
