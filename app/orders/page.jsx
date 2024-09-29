import { Box } from "@mui/material";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import OrderTable from "@/components/dashboard/order/OrderTable";
const page = () => {
  return (
    <Box>
      <Dashboard DynamicComponent={OrderTable} />
    </Box>
  );
};

export default page;
