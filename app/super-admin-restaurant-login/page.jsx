'use client'

import React from "react";
import SuperAdminRestaurantLogin from "@/components/dashboard/super-admin-restaurant-login/SuperAdminRestaurantLogin";
import { Box } from "@mui/material";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
const page = () => {
  return (
    <Box>
      <Provider store={store}>
        <SuperAdminRestaurantLogin />
        <Notification  />
      </Provider>
    </Box>
  );
};

export default page;
