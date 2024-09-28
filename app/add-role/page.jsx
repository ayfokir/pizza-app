"use client";
import { Box } from "@mui/material";
import React from "react";
import RoleTable from "@/components/dashboard/add-role/RoleTable";
import Dashboard from "@/components/dashboard/Dashboard";
import { populatePermissions } from "../api/permission/populatePermissions";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
const page = () => {
  // populatePermissions()
  return (
    <Box>
      <Provider store={store}>
        <Dashboard DynamicComponent={RoleTable} />
        <Notification />
      </Provider>
    </Box>
  );
};

export default page;
