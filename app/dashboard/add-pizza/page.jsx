"use client";
import { Box } from "@mui/material";
import React from "react";
import AddPizza from "@/components/dashboard/add-pizza/AddPizza";
// import store from "@/redux/store/store";
// import { Provider } from "react-redux";
import { Notification } from "@/notification/Notification";
// import { AuthProvider } from "@/context/AuthContext";
const page = () => {
  return (
    <Box>
      <AddPizza />
    </Box>
  );
};

export default page;
