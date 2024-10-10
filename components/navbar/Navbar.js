import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
// import { IconButton } from '@mui/material';
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = ({ noRegisterButton }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#FFF8F1", boxShadow: "none", padding: "0 16px" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        {/* Left Side: Logo */}
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ padding: 0 }}
            >
              <Image
                src="/logo.png" // Ensure the correct logo path
                alt="Pizza Logo"
                width={40}
                height={40}
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              // fontSize={"25px"}
              sx={{
                marginLeft: 1,
                color: "#AF5901",
                fontWeight: "bold",
                fontSize: {
                  xs: "14px", // for screens <600px
                  sm: "18px", // for screens ≥600px
                  md: "22px", // for screens ≥900px
                  lg: "25px", // for screens ≥1200px
                },
              }}
            >
              Pizza
            </Typography>
          </Box>
        </Link>

        {/* Center: Navigation Links */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          // gap={10}
          sx={{
            gap: {
              xs: 2, // for screens <600px
              sm: 6, // for screens ≥600px
              md: 8, // for screens ≥900px
              lg: 10, // for screens ≥1200px
            },
          }}
        >
          <Button
            // color="inherit"
            sx={{
              fontSize: {
                xs: "14px", // for screens <600px
                sm: "18px", // for screens ≥600px
                md: "22px", // for screens ≥900px
                lg: "25px", // for screens ≥1200px
              },
              color: "#f57c00",
              marginRight: 3,
              "&:hover": { color: "#f57c00" },
              fontWeight: "500",
              // fontSize: "25px",
              textTransform: "none", // Prevent uppercase transformation
            }}
          >
            Home
          </Button>
          <Link href={"/order-history"}>
            <Button
              color="inherit"
              sx={{
                fontSize: {
                  xs: "14px", // for screens <600px
                  sm: "18px", // for screens ≥600px
                  md: "22px", // for screens ≥900px
                  lg: "25px", // for screens ≥1200px
                },
                color: "#000",
                marginRight: 3,
                "&:hover": { color: "#f57c00" },
                fontWeight: "500",
                // color: "#f57c00",
                // fontSize: "25px",
                textTransform: "none", // Prevent uppercase transformation
              }}
            >
              Orders
            </Button>
          </Link>
          { !isSmallScreen && 
            <Button
              color="inherit"
              sx={{
                color: "#000",
                "&:hover": { color: "#f57c00" },
                fontWeight: "500",
                fontSize: "25px",
                textTransform: "none", // Prevent uppercase transformation
                fontSize: {
                  xs: "14px", // for screens <600px
                  sm: "18px", // for screens ≥600px
                  md: "22px", // for screens ≥900px
                  lg: "25px", // for screens ≥1200px
                },
              }}
            >
              Who We Are
            </Button>
          }
        </Box>

        {!noRegisterButton && (
         
          <Box>
           { 
           
           isSmallScreen && <IconButton edge="end" color="black">
            <MenuIcon />
          </IconButton>
          
          }
          { !isSmallScreen &&
           <Link href={"/register-customer"}>
              <Button
                variant="contained"
                
                sx={{
                  marginTop: "10px",
                  width: "148px",
                  backgroundColor: "#f57c00",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#d35f00" },
                  fontWeight: "500",
                  // fontSize: "22px",
                  fontSize: {
                    xs: "14px", // for screens <600px
                    sm: "18px", // for screens ≥600px
                    md: "22px", // for screens ≥900px
                    lg: "25px", // for screens ≥1200px
                  },
                  py: "5px",
                  textTransform: "none", // Prevent uppercase transformation
                }}
              >
                Register
              </Button>
            </Link>
            }
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
