import { Box } from "@mui/material";
import React from "react";
import OrderTable from "@/components/dashboard/add-role/RoleTable";
import Dashboard from "@/components/dashboard/Dashboard";
const page = () => {
  return (
    <Box>
      <Dashboard DynamicComponent={OrderTable} />
    </Box>
  );
};

export default page;
