import React from "react";
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout"; // Import logout icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from "react-redux";
import { setHeaderTitle } from "@/redux/slices/headerTtileSlice";
const SideBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch(); // Get dispatch function from Redux


  const handleHeaderTitle   =  (title)  =>  {
    dispatch(setHeaderTitle(title))
  }
  console.log("see the current :", pathname);
  const menuItems = [
    {
      text: "Orders",
      icon: (
        <Image
          src="/dashboard/orders.png"
          width={24}
          height={24}
          alt="Orders"
        />
      ),
      link: "/orders",
    },
    {
      text: "Add Menu",
      icon: (
        <Image
          src="/dashboard/add-menu.png"
          width={24}
          height={24}
          alt="Add Menu"
        />
      ),
      link: "/add-pizza",
    },
    {
      text: "Role",
      icon: (
        <Image src="/dashboard/role.png" width={24} height={24} alt="Role" />
      ),
      link: "/add-role",
    },
    {
      text: "User",
      icon: (
        <Image src="/dashboard/user.png" width={24} height={24} alt="User" />
      ),
      link: "/add-user",
    },
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
      }}
    >
      {/* Logo and Menu */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="12px"
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
      <List
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <Link href={item.link} key={item.text}  style={{ textDecoration: "none" }}>
            <ListItemButton
              onClick={() => handleHeaderTitle(item.text)} // Update header title on click
              sx={{
                borderRadius: "6px",
                paddingLeft: "40px",
                backgroundColor: pathname === item.link ? "rgba(255,129,0,0.3)" : "transparent", // Apply color if the current path matches
                "&:hover": {
                  backgroundColor: "rgba(255,129,0,0.1)", // Slight hover effect
                },
                marginBottom: "8px",
              }}
            >
              <ListItemIcon sx={{ color: "#000", minWidth: "36px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: {
                    color: "#000",
                    fontWeight: "bold",
                    paddingLeft: "0px",
                  },
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>

      {/* Add a divider above the logout button */}
      <Divider sx={{ width: "90%", marginBottom: "16px" }} />

      <Button
        startIcon={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Arrow Icon */}
            <ArrowForwardIcon
              sx={{
                color: 'red', // Color for the arrow
                fontSize: '16px', // Adjust size as needed
              }}
            />
            {/* Custom Bracket-like Symbol */}
            <Typography
              sx={{
                fontSize: '17px', // Font size for the bracket
                color: 'red', // Match the color of the arrow
                lineHeight: '1', // Adjust line height for better vertical alignment
                fontWeight: 500, // Make the bracket bold
              }}
            >
              ]
            </Typography>
          </Box>
        }
        sx={{
          color: 'red', // Text color
          fontWeight: 'bold', // Bold text
          fontSize: '16px', // Font size
          width: '90%', // Button width
          display: 'flex', // Ensure alignment
          justifyContent: 'center', // Align text and icon to the start
          "&:hover": {
            backgroundColor: "transparent", // No hover background
          },
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default SideBar;
