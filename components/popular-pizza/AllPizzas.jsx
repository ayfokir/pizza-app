"use client";

import React, { useEffect, useMemo } from "react";
import PizzaCard from "@/components/popular-pizza/PizzaCard";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzasRequest } from "@/redux/slices/pizzaSlice";
import { fetchRestaurantsRequest } from "@/redux/slices/restaurantSlice";

const AllPizzas = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  
  // Select pizzas from Redux state
  const pizzas = useSelector((state) => state.pizza); // Adjust according to your pizza slice structure
  const restaurants = useSelector((state) => state.restaurants.restaurants); // Adjust accordingly

  useEffect(() => {
    dispatch(fetchPizzasRequest());
    dispatch(fetchRestaurantsRequest());
  }, [dispatch]);

  // Create a map of restaurant IDs to restaurant details for quick lookup
  const restaurantMap = useMemo(() => {
    const map = {};
    restaurants?.forEach((restaurant) => {
      map[restaurant.id] = restaurant; // Assuming each restaurant has a unique 'id'
    });
    return map;
  }, [restaurants]);
  console.log("see pizzas:", pizzas)
  // Check if loading or if there's an error
  if (pizzas.loading === "loading") {
    return <div>Loading...</div>;
  }
  if (pizzas.error) {
    return <div>Error: {pizzas.error}</div>;
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
    <Typography
      paddingLeft={"80px"}
      mx={5}
      component={"h2"}
      sx={{ fontSize: "35px", color: "#00000080", paddingTop: "90px" }}
    >
      Popular Pizzas
    </Typography>
    {pizzas?.pizzas?.length > 0 ? ( // Check if there are pizzas
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={4}
        sx={{
          mx: {
            xs: 0, // for screens <600px
            sm: 3, // for screens ≥600px
            md: 4, // for screens ≥900px
            lg: 5, // for screens ≥1200px
          }
        }}
        marginTop={2}
        paddingBottom={"60px"}
      >
        {pizzas.pizzas.map((pizza) => {
          // Get the specific restaurant associated with the pizza
          const restaurant = restaurantMap[pizza.restaurantId];
  
          return (
            <PizzaCard
              key={pizza.id} // Unique key for each pizza card
              pizzaId={pizza.id}
              name={pizza.name}
              price={pizza.price}
              pizza_photo={pizza.pizza_photo} // Pass the photo URL
              toppings={pizza.toppings} // Pass the toppings array
              restaurant={restaurant} // Pass the specific restaurant
            />
          );
        })}
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
        No pizzas found. Please check back later!
      </Typography>
    )}
  </Box>
  
  );
};

export default AllPizzas;
