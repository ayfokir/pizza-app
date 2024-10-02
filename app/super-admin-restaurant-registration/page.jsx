"use client";
import React from "react";
import SuperAdminRestaurantRegistration from "@/components/dashboard/Super-admin-restaurant-registration/SuperAdminRestaurantRegistration";
import { Box } from "@mui/material";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
const page = () => {
  return (
    <Box>
      <Provider store={store}>
        <Notification />
        <SuperAdminRestaurantRegistration />
      </Provider>
    </Box>
  );
};

export default page;
