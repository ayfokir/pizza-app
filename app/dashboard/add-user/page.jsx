"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import UserTable from "@/components/dashboard/add-user/UserTable";
import { populatePermissions } from "../../api/permission/populatePermissions";
import { Can } from "@casl/react";

const page = () => {
  // useEffect(() => {
  //   // Call populatePermissions if needed
  //   // populatePermissions();
  // }, []);

  return (
    <Box>
      <UserTable />
    </Box>
  );
};

export default page;
