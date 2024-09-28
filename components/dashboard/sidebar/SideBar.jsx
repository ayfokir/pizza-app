"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/LocalLibrary"; // LocalLibrary is often used for books
import UploadIcon from "@mui/icons-material/Upload"; // For Book Upload
import PeopleIcon from "@mui/icons-material/People"; // For Owners
import Image from "next/image";
import Link from "next/link";

const SideBar = ({ isFullHeight }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const menuItems = [
    { text: "Orders", icon: <DashboardIcon />, link: "/orders" },
    { text: "Add Menu", icon: <BookIcon />, link: "/add-pizza" },
    { text: "Role", icon: <UploadIcon />, link: "/add-role" },
    { text: "User", icon: <PeopleIcon />, link: "/add-user" },
  ];

  const logout = () => {
    localStorage.removeItem("customer");
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F3F3F340",
        width: "250px",
        // borderRight: "1px solid #E0E0E0",
      }}
    >
      {/* Logo and Menu */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="12px"
        // borderBottom="1px solid #E0E0E0"
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
          PIZZA
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ marginLeft: "10px", paddingRight: "16px" }}>
            <Image
              src="/material-symbols_menu-open.png"
              alt="menu"
              width={24}
              height={24}
            />
          </IconButton>
        </Box>
      </Box>

      {/* User Profile Image */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        mb={2}
        sx={{ background: "#FF81000D" }}
        width={"100%"}
        height={"113px"}
      >
        <Image src="/logo.png" width={60} height={60} alt="Logo" />
      </Box>

      {/* Menu Items */}
      <List sx={{ width: "100%",  flexGrow: "0.3", alignItems: "center", justifyContent: "center"}} >
        {menuItems.map((item, index) => (
          <Link href={item.link} key={item.text} passHref>
            <ListItemButton
              onClick={() => setSelectedIndex(index)}
              sx={{
                borderRadius: "6px",
                backgroundColor:
                  selectedIndex === index
                    ? "rgba(0,171,255,0.2)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0,171,255,0.2)",
                },
                marginBottom: index < menuItems.length - 1 ? "8px" : "0", // Remove margin for the last item
              }}
            >
              <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: { color: "#000", fontWeight: "bold" },
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Button
        variant="contained"
        sx={{
            backgroundColor: "rgb(69,73,94)",
            color: "white",
            width: "90%",
            marginBottom: "16px",
        }}
        onClick={logout}
      >
        {/* <Divider /> */}
        Logout
      </Button>
    </Box>
  );
};

export default SideBar;
