"use client";
import { Box } from "@mui/material";
import React from "react";
import Login from "@/components/login/Login";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
const page = () => {
  return (
    <Box>
      <Provider store={store}>
        <Notification />
        <Login />
      </Provider>
    </Box>
  );
};

export default page;
