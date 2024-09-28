import React from "react";
import { Box } from "@mui/material";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";

const Dashboard = ({DynamicComponent}) => {
  return (
    <>
    <Box display={"flex"} gap={1}>
      <Box >
        <SideBar />
      </Box>
      <Box display={"flex"}  flexDirection={"column"} flexGrow={1}>
        <Header />
        <Box sx={{backgroundColor:"#F8F8F8"}}>
        {DynamicComponent && <DynamicComponent />}
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
