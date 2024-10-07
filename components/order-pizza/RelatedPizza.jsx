"use client";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RelatedPizzaCard from "@/components/order-pizza/RelatedPizzaCard";
import { fetchPizzasRequest } from "@/redux/slices/pizzaSlice";

const RelatedPizza = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const pizzas = useSelector((state) => state.pizza); // Adjust according to your pizza slice structure
  // console.log("see the pizzas inside related pizza:", pizzas);

  useEffect(() => {
    dispatch(fetchPizzasRequest());
    // dispatch(fetchRestaurantsRequest())
  }, [dispatch]);

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          paddingLeft={"80px"}
          mx={5}
          component={"h2"}
          sx={{ fontSize: "35px", color: "#00000080", paddingTop: "15px" }}
        >
          Related
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"nowrap"}
          justifyContent={"center"}
          gap={4}
          mx={5}
          marginTop={2}
          paddingBottom={"60px"}
          sx={{
            overflowX: "scroll",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in WebKit-based browsers
          }}
        >
          {pizzas?.pizzas?.map((pizza) => {
            return (
              <RelatedPizzaCard
                key={pizza.id} // Unique key for each pizza card
                pizzaId={pizza.id}
                name={pizza.name}
                price={pizza.price}
                pizza_photo={pizza.pizza_photo} // Pass the photo URL
                toppings={pizza.toppings} // Pass the toppings array
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default RelatedPizza;
