'use client'
import React from 'react'
import OrderPizzaCard from '@/components/order-pizza/OrderPizzaCard'
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { Box } from '@mui/material';
import { GetPizzas } from '@/app/api/pizza/GetPizzas';
import { GetRestaurants } from '@/app/api/restaurant/GetRestaurant';
import { AuthProvider } from "@/context/AuthContext";

const page = async() => {
    let pizzas = await GetPizzas();
    let restaurant = await GetRestaurants();
    console.log("restaurant:", restaurant);
      // Check if pizzas retrieval was successful
  if (!pizzas.success) {
    return <div>Error: {pizzas.message}</div>;
  }
  return (
      <Provider store={store}>
        <AuthProvider>
        <Notification />
        <OrderPizzaCard 
         key={pizza.id} // Unique key for each pizza card
         name={pizza.name}
         price={pizza.price}
         pizza_photo={pizza.pizza_photo} // Pass the photo URL
         toppings={pizza.toppings} // Pass the toppings array
         restaurant = {restaurant.restaurants}
        />
        </AuthProvider>
      </Provider>
)}

export default page