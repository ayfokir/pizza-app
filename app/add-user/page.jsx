"use client";
import { Box } from "@mui/material";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import UserTable from "@/components/dashboard/add-user/UserTable";
import { populatePermissions } from "../api/permission/populatePermissions";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { AuthProvider } from "@/context/AuthContext";
const page = () => {
  // populatePermissions()
  return (
    <Box>
      <Provider store={store}>
        <AuthProvider>
          <Dashboard DynamicComponent={UserTable} />
          <Notification />
        </AuthProvider>
      </Provider>
    </Box>
  );
};

export default page;
