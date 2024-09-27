"use client";

import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        padding: "10px 30px",
        borderRadius: "10px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: PIZZA and Menu Icon with small width */}
        <Box
          display="flex"
          alignItems="center"
          gap={400}
          sx={{ flexBasis: "20%", flexShrink: 0, justifyContent: "flex-start" , gap:"60px"}}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            PIZZA
          </Typography>
          <IconButton sx={{ marginLeft: "10px" }}>
            <Image
              src="/material-symbols_menu-open.png"
              alt="menu"
              width={24}
              height={24}
            />
          </IconButton>
        </Box>

        {/* Right side: Add menu, Notification, and Profile with 80% width */}
        <Box
          display="flex"
          // backgroundColor="red"
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexBasis: "80%", flexGrow: 0.6}}
        >
          {/* Add Menu Section */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            Add menu
          </Typography>

          {/* Notification and Profile Icons */}
          <Box display="flex" alignItems="center">
            {/* Notification Icon */}
            <IconButton sx={{ marginLeft: "10px" }}>
              <Image
                src="/profile/notification.png"
                alt="notification"
                width={24}
                height={24}
              />
            </IconButton>

            {/* Profile Icon */}
            <IconButton sx={{ marginLeft: "10px" }}>
              <Image src="/profile/profile.png" alt="profile" width={24} height={24} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
