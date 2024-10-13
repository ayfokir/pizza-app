"use client";
import { Box } from "@mui/material";
import Header from "@/components/dashboard/header/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { AuthProvider } from "@/context/AuthContext";

const Dashboard = ({ children }) => {
  return (
    <AuthProvider>
      <Box display={"flex"} gap={1}>
        <Box>
          <SideBar />
        </Box>
        <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
          <Header />
          <Box sx={{ backgroundColor: "#F8F8F8" }}>{children}</Box>
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default Dashboard;
