'use client'
import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "@/components/dashboard/header/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { useAbility } from "@/context/AbilityContext";

const Dashboard = ({ children }) => {
//   const abilities = useAbility();

  return (
    <>
      <Box display={"flex"} gap={1}>
        <Box>
          <SideBar />
        </Box>
        <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
          <Header />
          <Box sx={{ backgroundColor: "#F8F8F8" }}>
            {/* {abilities.can("manage", "all") ? (
              DynamicComponent && <DynamicComponent />
            ) : (
              <Typography variant="h6" color="textSecondary">
                You do not have permission to view this.{" "}
              </Typography>
            )} */}
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
