'use client'
import { Box } from "@mui/material";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import OrderTable from "@/components/dashboard/orders/OrderTable";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
const page = () => {
  return (
    <Box>
      <Provider store={store}>
      <Dashboard DynamicComponent={OrderTable} />
      </Provider>
    </Box>
  );
};

export default page;
