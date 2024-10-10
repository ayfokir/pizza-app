import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const FooterComp2 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        padding: "16px",
        color: "#fff",
        textAlign: "center",
        // px: "60px"
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Footer Text */}
      <Box display="flex" gap={3} sx={ {
        flexDirection: {
          xs: "column",
          sm: "row",
        }
      }}>
        <Typography variant="body2">
          ©2024 Pizza All Rights Reserved.
        </Typography>
      <Typography variant="body2">Terms & Conditions</Typography>
      </Box>
      {/* Social Media Icons */}
      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <IconButton sx={{ color: "#fff" }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <YouTubeIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FooterComp2;
