"use client";

import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  let title = useSelector((state) => state.header);
  console.log("see the titl:", title);
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Optional: add shadow
        padding: 0,
      }}
    >
      <Toolbar sx={{ padding: 0 }}>
        <Box display="flex" justifyContent="space-between" width="100%">
          {/* Add Menu Section */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", flexGrow: 1 }}
          >
            {title.title}
          </Typography>

          {/* Notification and Profile Icons */}
          <Box display="flex" alignItems="center">
            <IconButton sx={{ marginLeft: "10px" }}>
              <Image
                src="/profile/notification.png"
                alt="notification"
                width={24}
                height={24}
              />
            </IconButton>
            <IconButton sx={{ marginLeft: "10px" }}>
              <Image
                src="/profile/profile.png"
                alt="profile"
                width={24}
                height={24}
              />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
