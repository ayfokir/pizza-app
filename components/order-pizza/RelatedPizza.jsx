"use client";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RelatedPizzaCard from "@/components/order-pizza/RelatedPizzaCard";
import { fetchPizzasRequest } from "@/redux/slices/pizzaSlice";

const RelatedPizza = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const pizzas = useSelector((state) => state.pizza); // Adjust according to your pizza slice structure
  console.log("see the pizzas inside related pizza:", pizzas);

  useEffect(() => {
    dispatch(fetchPizzasRequest());
    // dispatch(fetchRestaurantsRequest())
  }, [dispatch]);

  return (
    <Box>
      <Typography sx={{ padding: 2, fontSize: "40px", fontWeight: "body1" }}>
        Related
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in WebKit-based browsers
        }}
      >
        {pizzas?.pizzas?.map((pizza, index) => (
          <Box
            key={pizza.id} // Unique key for each pizza card
            sx={{
              flexShrink: 0, // Prevent the card from shrinking
              width: "300px", // Set a fixed width for each card
              // marginRight: index < pizzas.pizzas.length - 1 ? 2 : 0, // Add margin only between cards
            }}
          >
            <RelatedPizzaCard
              pizzaId={pizza.id}
              name={pizza.name}
              price={pizza.price}
              pizza_photo={pizza.pizza_photo} // Pass the photo URL
              toppings={pizza.toppings} // Pass the toppings array
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedPizza;
