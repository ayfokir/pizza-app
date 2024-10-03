import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography, Radio } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import the arrow icon
const CustomStatusSwitch = ({ currentStatus, onChangeStatus }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      if (anchorEl) {
        setAnchorEl(null); // Close if already open
      } else {
        setAnchorEl(event.currentTarget); // Open the menu
      }
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleStatusChange = (status) => {
      onChangeStatus(status);
      handleClose();
    };
  
    return (
      <Box
      sx={{width:"143px"}}
  
      >
        <Button
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />} // Add the arrow icon to the button
          style={{
            backgroundColor:
              currentStatus === "Preparing"
                ? "#FF9921"
                : currentStatus === "Ready"
                ? "green"
                : "lightblue",
            color: "white",
            fontWeight: "bold",
            borderRadius: 4,
            width: "100%",
            textAlign: "left", // Align text to the left
          }}
        >
          {currentStatus}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          
        >
          <MenuItem onClick={handleClose} sx={{ justifyContent: "space-between", paddingY: 0, }}>
            <Typography>Preparing</Typography>
            <Radio
              checked={currentStatus === "Preparing"}
              onChange={() => handleStatusChange("Preparing")}
            />
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ justifyContent: "space-between", paddingY: 0 }}>
            <Typography>Ready</Typography>
            <Radio
              checked={currentStatus === "Ready"}
              onChange={() => handleStatusChange("Ready")}
            />
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ justifyContent: "space-between", paddingY: 0 }}>
            <Typography>Delivered</Typography>
            <Radio
              checked={currentStatus === "Delivered"}
              onChange={() => handleStatusChange("Delivered")}
            />
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  export default CustomStatusSwitch;
