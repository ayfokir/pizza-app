'use client'

import React, { useEffect } from 'react';
import PizzaCard from '@/components/popular-pizza/PizzaCard';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzasRequest } from '@/redux/slices/pizzaSlice';
import { fetchRestaurantsRequest } from '@/redux/slices/restaurantSlice';

const AllPizzas = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux

  // Select pizzas from Redux state
  const pizzas = useSelector(state => state.pizza); // Adjust according to your pizza slice structure
  const restaurants = useSelector(state => state.restaurant.restaurants); // Adjust accordingly
  console.log("see the restuarant  inside hoempage:", restaurants)

  useEffect(() => {
    dispatch(fetchPizzasRequest());
    dispatch(fetchRestaurantsRequest())
  }, [dispatch]);

  // //Check if loading or if there's an error
  // if (pizzas.loading) {
  //   return <div>Loading...</div>;
  // }

  if (pizzas.error) {
    return <div>Error: {pizzas.error}</div>;
  }

  return (
      <Box display={"flex"} flexWrap={"wrap"} gap={4}>
        {pizzas.pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id} // Unique key for each pizza card
            pizzaId = {pizza.id}
            name={pizza.name}
            price={pizza.price}
            pizza_photo={pizza.pizza_photo} // Pass the photo URL
            toppings={pizza.toppings} // Pass the toppings array
            restaurant={restaurants} // Match the restaurant with the pizza
          />
        ))}
      </Box>
  );
};

export default AllPizzas;
