"use client";
import React, { useEffect, useState } from "react";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { Box } from "@mui/material";
// import { GetPizzas } from '@/app/api/pizza/GetPizzas';
// import { GetRestaurants } from '@/app/api/restaurant/GetRestaurant';
import { AuthProvider } from "@/context/AuthContext";
import OrderPizzaCard from "@/components/order-pizza/OrderPizzaCard"; // Make sure this component is correctly imported
import RelatedPizza from "@/components/order-pizza/RelatedPizza";
const Page = () => {
  // const [pizzas, setPizzas] = useState([]);
  // const [restaurants, setRestaurants] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch pizzas
  //       const pizzasData = await GetPizzas();
  //       if (pizzasData.success) {
  //         setPizzas(pizzasData.pizzas); // Assuming pizzasData.pizzas contains the array of pizza objects
  //       } else {
  //         setError(pizzasData.message);
  //       }

  //       // Fetch restaurants
  //       const restaurantData = await GetRestaurants();
  //       if (restaurantData.success) {
  //         setRestaurants(restaurantData.restaurants); // Assuming restaurantData.restaurants contains the array of restaurant objects
  //       } else {
  //         setError(restaurantData.message);
  //       }

  //     } catch (error) {
  //       setError("Failed to fetch data.");
  //     }
  //   };

  //   fetchData(); // Call the fetch function
  // }, []); // Empty dependency array means this will run once when the component mounts

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <Provider store={store}>
      <AuthProvider>
        <Notification />
        <Box sx={{backgroundColor: "#FFF8F1"}}>
          <OrderPizzaCard />
        <RelatedPizza />
        </Box>
      </AuthProvider>
    </Provider>
  );
};

export default Page;
