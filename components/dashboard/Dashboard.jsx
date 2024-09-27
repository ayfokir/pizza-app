import React from "react";
import { Box } from "@mui/material";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import OrderTable from "./table/OrderTable";
import Head from "next/head";
const Dashboard = () => {
  return (

    <>
    <Box display={"flex"} flexDirection={"column"}>
      <Box>
        <Header />
      </Box>
      <Box display={"flex"} gap={5}>
        <SideBar />
        <OrderTable />
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
