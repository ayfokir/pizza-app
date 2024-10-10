import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import PizzaIcon from "@mui/icons-material/LocalPizza";
import Image from "next/image";
const FooterComp1 = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      height={"200px"}
      sx={{
        backgroundColor: "#d0b894",
        boxShadow: "none",
        px: {
          xs: "1px", // Add space from the left side for small screens
          sm: "10px", // Increase the left padding for larger screens
          md: "40px",
          lg: "60px",
        },
      }}
    >
      {/* Navigation Links */}
      <Box
        display="flex"
        alignItems="center"
        gap={{ xs: 2, sm: 4 }} // Responsive gap: smaller on xs, larger on sm and above
        sx={{
          flexDirection: {
            xs: "column", // Stack buttons vertically on small screens
            sm: "row", // Place buttons in a row on larger screens
          },
          justifyContent: "center", // Center horizontally and vertically
          alignItems: "center",
        }}
      >
        <Button sx={{ color: "#000", fontWeight: "bold", fontSize: "16px" }}>
          Home
        </Button>
        <Button sx={{ color: "#000", fontWeight: "bold", fontSize: "16px" }}>
          Order
        </Button>
        <Button sx={{ color: "#000", fontWeight: "bold", fontSize: "16px" }}>
          About Us
        </Button>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Box display="flex" alignItems="center">
          <Image src={"/logo.png"} width={50} height={50} />
          <Typography
            variant="h6"
            sx={{ ml: 1, color: "#d2691e", fontWeight: "bold" }}
          >
            Pizza
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" ml={4} sx={{ position: "relative", width: "100%" }}>
  <InputBase
    placeholder="Your feedback..."
    sx={{
      backgroundColor: "#fff",
      borderRadius: 2,
      padding: "12px 8px",
      maxWidth: "370px",
      width: {
        xs: "200px",
        sm: "250px",
        md: "290px",
        lg: "360px",
      },
      color: "#999",
      fontSize: "14px",
    }}
  />

  {/* Icon placed at the end of the input */}
  <Box sx={{ position: "absolute", right: "38px", top: "50%", transform: "translateY(-50%)" }}>
    <Image src={"/footerIcon.png"} width={25} height={25} />
  </Box>
</Box>

      </Box>
    </Box>
  );
};

export default FooterComp1;
