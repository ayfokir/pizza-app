"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import RoleTable from "@/components/dashboard/add-role/RoleTable";
import Dashboard from "@/components/dashboard/Dashboard";
import { populatePermissions } from "@/app/api/permission/populatePermissions";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { AuthProvider } from "@/context/AuthContext";
import { useAbility } from "@/context/AbilityContext";

const page = () => {
  const abilities = useAbility();
  
  // populatePermissions()
  return (
    <Box>
      {/* <Provider store={store}> */}
      {/* <AuthProvider> */}
      {abilities.can("manage", "all") ? (
        <RoleTable />
      ) : (
        <Typography variant="h6" color="textSecondary">
          You do not have permission to view this.{" "}
        </Typography>
      )}{" "}
      {/* <Notification /> */}
      {/* </AuthProvider> */}
      {/* </Provider> */}
    </Box>
  );
};

export default page;
