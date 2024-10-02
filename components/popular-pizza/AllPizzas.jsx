"use client";

import React, { useEffect } from "react";
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
  console.log("see the restuarant  inside hoempage:", restaurants);

  useEffect(() => {
    dispatch(fetchPizzasRequest());
    dispatch(fetchRestaurantsRequest());
  }, [dispatch]);

  // //Check if loading or if there's an error
  // if (pizzas.loading) {
  //   return <div>Loading...</div>;
  // }
  if (pizzas.error) {
    return <div>Error: {pizzas.error}</div>;
  }
  // background: #00000080;

  return (
    <Box display={"flex"} flexDirection={"column"}>
            <Typography paddingLeft={"80px"} mx={5} component={"h2"}  sx={{fontSize:"35px", color: "#00000080", paddingTop: "90px"}}>Popular Pizzas</Typography>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={4} mx={5} marginTop= {2} paddingBottom={"60px"} >
        {pizzas?.pizzas?.map((pizza) => (
          <PizzaCard
            key={pizza.id} // Unique key for each pizza card
            pizzaId={pizza.id}
            name={pizza.name}
            price={pizza.price}
            pizza_photo={pizza.pizza_photo} // Pass the photo URL
            toppings={pizza.toppings} // Pass the toppings array
            restaurant={restaurants} // Match the restaurant with the pizza
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllPizzas;
