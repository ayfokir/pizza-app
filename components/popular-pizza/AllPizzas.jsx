import React from 'react';
import PizzaCard from '@/components/popular-pizza/PizzaCard';
import { GetPizzas } from '@/app/api/pizza/GetPizzas';
import { GetRestaurants } from '@/app/api/restaurant/GetRestaurant';
import { Box } from '@mui/material';

const AllPizzas = async () => {
  let pizzas = await GetPizzas();
  let restaurant = await GetRestaurants();
  console.log("restaurant:", restaurant);

  // Check if pizzas retrieval was successful
  if (!pizzas.success) {
    return <div>Error: {pizzas.message}</div>;
  }

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={4}>
      {pizzas.pizzas.map((pizza) => (
        <PizzaCard
          key={pizza.id} // Unique key for each pizza card
          name={pizza.name}
          price={pizza.price}
          pizza_photo={pizza.pizza_photo} // Pass the photo URL
          toppings={pizza.toppings} // Pass the toppings array
          restaurant = {restaurant.restaurants}
        />
      ))}
    </Box>
  );
};

export default AllPizzas;
