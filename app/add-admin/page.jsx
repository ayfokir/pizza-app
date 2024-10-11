"use client";
import { Box } from "@mui/material";
import React from "react";
import AddAdmin from "@/components/dashboard/Super-admin-restaurant-registration/AddAdmin";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { AuthProvider } from "@/context/AuthContext";
const page = () => {
  return (
    <Box>
      {/* <Provider store={store}> */}
        {/* <AuthProvider> */}
        <AddAdmin />
        {/* <Notification /> */}
        {/* </AuthProvider> */}
      {/* </Provider> */}
    </Box>
  );
};

export default page;
