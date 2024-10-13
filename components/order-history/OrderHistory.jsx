"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersRequest } from "@/redux/slices/orderSlice";
import OrderHistoryCard from "./OrderHistoryCard";
import { useAuth } from "@/context/AuthContext";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const [userOrders, setUserOrders] = useState([]);
  const orders = useSelector((state) => state.orders.orders);
  
  const { id, restaurantId } = useAuth(); // user Id
  
  console.log("see orders :", orders);
  console.log("see userId:", id);
  
  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchOrdersRequest(restaurantId));
    }
  }, [restaurantId]);

  useEffect(() => {
    if (id && orders?.length > 0) {
      // filter user orders based on customerId
      const filteredOrders = orders?.filter((order) => order.customerId === id);
      console.log("filtered orders:", filteredOrders);
      setUserOrders(filteredOrders);
    }
  }, [id, orders]);

  return (
    <Box sx={{ backgroundColor: "#FFF8F1", height: "100vh" }}>
      <Navbar noRegisterButton={true} />
      <Box sx={{ marginTop: "60px" }}>
        <Typography
          mx={5}
          paddingLeft={"70px"}
          paddingTop={20}
          component={"h2"}
          sx={{ fontSize: "35px", color: "#00000080", paddingTop: "15px" }}
        >
          Order History
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={4}
          mx={5}
          marginTop={2}
          //  sx={{
          //    overflowX: "scroll",
          //    scrollBehavior: "smooth",
          //    "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in WebKit-based browsers
          //  }}
        >
          {userOrders.length > 0 ? (
            userOrders.map((order) => (
              <OrderHistoryCard
                key={order.id}
                name={order.pizzas[0].pizza.name}
                price={order.pizzas[0].pizza.price}
                pizza_photo={order.pizzas[0].pizza.pizza_photo}
                toppings={order.pizzas[0].toppings}
                status={order.status}
              />
            ))
          ) : (
            <Typography
              sx={{ fontSize: "35px", color: "#00000080", paddingY: "35px" }}
            >
              No order history found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;
