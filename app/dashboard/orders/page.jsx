'use client'
import { Box } from "@mui/material";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import OrderTable from "@/components/dashboard/orders/OrderTable";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { AbilityContext } from "@/context/AbilityContext";
import { defineAbilityFor } from "@/util/Abilities";
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
