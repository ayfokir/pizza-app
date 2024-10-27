"use client";
import React from "react";
import OrderHistory from "@/components/order-history/OrderHistory";
import { Box } from "@mui/material";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { AuthProvider } from "@/context/AuthContext";
const page = () => {
  return (
    // <Provider store={store}>
      <AuthProvider>
      <Box sx={{ backgroundColor: "#FFF8F1", minHeight: "100vh" }}>
        <OrderHistory />
      </Box>
      </AuthProvider>
    // </Provider>
  );
};

export default page;
