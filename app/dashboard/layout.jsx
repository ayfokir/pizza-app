"use client";
import { Box } from "@mui/material";
import Header from "@/components/dashboard/header/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
const Dashboard = ({ children }) => {
  const router = useRouter();
  const { ability, roles, id } = useAuth();
  console.log("see the ability inside the layout.js", ability)
  // Check if the user is authenticated
  // useEffect(() => {
  //   if (!id || !ability) {
  //     router.push("/super-admin-restaurant-login"); // Redirect to login page if not authenticated
  //   }
  // }, [id, ability, router]);

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
