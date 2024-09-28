import React from "react";
import { Box } from "@mui/material";
import Dashboard from "@/components/dashboard/Dashboard";
import OrderTable from "@/components/dashboard/add-role/RoleTable";

const page = () => {
  return (
    <Box>
      <Dashboard DynamicComponent={OrderTable} />
    </Box>
  );
};

export default page;