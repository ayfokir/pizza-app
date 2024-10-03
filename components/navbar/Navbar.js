import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import Image from "next/image";

const Navbar = ({noRegisterButton}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#fff", boxShadow: "none", padding: "0 16px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
        {/* Left Side: Logo */}
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
            sx={{ marginLeft: 1, color: "#AF5901", fontWeight: "bold" }}
          >
            Pizza
          </Typography>
        </Box>

        {/* Center: Navigation Links */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          gap={10}
        >
          <Button
            color="inherit"
            sx={{
              color: "#f57c00",
              marginRight: 3,
              "&:hover": { color: "#f57c00" },
              fontWeight: "bold",
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "#000",
              marginRight: 3,
              "&:hover": { color: "#f57c00" },
              fontWeight: "bold",
            }}
          >
            Orders
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "#000",
              "&:hover": { color: "#f57c00" },
              fontWeight: "bold",
            }}
          >
            Who We Are
          </Button>
        </Box>

       {!noRegisterButton &&
       
       <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          flexGrow={1}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f57c00",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#d35f00" },
            }}
          >
            Register
          </Button>
        </Box>}


      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
