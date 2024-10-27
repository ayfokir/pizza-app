"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import RoleTable from "@/components/dashboard/add-role/RoleTable";
import { populatePermissions } from "@/app/api/permission/populatePermissions";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
import { AuthProvider } from "@/context/AuthContext";
import { DeleteSomthing } from "@/app/api/permission/DeletSomthing";
import { DeleteUser } from "@/app/api/user/DeleteUser";
const page = () => {
  // populatePermissions()
  //  DeleteSomthing()
//  DeleteUser(46)
  return (
    <Box>
      <RoleTable />
      {/* <Typography variant="h6" color="textSecondary">
          You do not have permission to view this.{" "}
        </Typography> */}
    </Box>
  );
};

export default page;
