'use client'

import React, { useState } from 'react';
import { Box, List, ListItemIcon, ListItemText, Typography, Divider, ListItemButton, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/LocalLibrary'; // LocalLibrary is often used for books
import UploadIcon from '@mui/icons-material/Upload'; // For Book Upload
import PeopleIcon from '@mui/icons-material/People'; // For Owners
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';

const SideBar = ({ isFullHeight }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const menuItems = [
    { text: 'Orders', icon: <DashboardIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/orders" },
    { text: 'Add Menu', icon: <BookIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/add-menu" },
    { text: 'Role', icon: <UploadIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/role" },
    { text: 'User', icon: <PeopleIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/user" },
    // { text: 'Renters', icon: <PeopleIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/upload" },
    // { text: 'Notification', icon: <NotificationsIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/upload" },
    // { text: 'Settings', icon: <SettingsIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/settings" },
  ];
  
  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('customer');
    // Optionally, redirect the user to the login page or home page
    window.location.href = '/login'; // or '/home' or any other route
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(23,27,54)', // Set the background color
        height: "100vh", // Use prop to determine height
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        // justifyContent: "center",
        margin: '24px', // Add margin for spacing around the parent component
        marginRight: 0,
        borderRadius: "10px",
        padding: "24px",
        width: "20%"
      }}
    >
      <Box display="flex" alignItems="center"  gap={2} p={2}>
        <Image
          src='/logo.png'
          width={60}
          height={60}
          alt='Logo'
        />
    
      </Box>

      {/* <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} /> Styling for Divider */}

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={item.text}>
            <ListItemButton
              onClick={() => setSelectedIndex(index)}
              sx={{
                borderRadius: "6px",
                backgroundColor: selectedIndex === index ? 'rgb(0,171,255)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0,171,255,0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ style: { color: item.color } }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Button sx={{ backgroundColor: "rgb(69,73,94)", color: "white" }} onClick={logout}>Logout</Button>
    </Box>
  );
};

export default SideBar;
