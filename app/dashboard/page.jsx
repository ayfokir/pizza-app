"use client";
import React from "react";
import { Box } from "@mui/material";
import OrderTable from "@/components/dashboard/orders/OrderTable";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
const page = () => {
  return (
    <Box>
      {/* <Provider store={store}> */}
      <OrderTable />
      {/* </Provider> */}
    </Box>
  );
};

export default page;
