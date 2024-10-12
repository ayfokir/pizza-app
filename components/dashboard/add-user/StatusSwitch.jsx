import React, { useEffect, useState } from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import { Check } from "@mui/icons-material"
const StatusSwitch = ({ id, status, onStatusChange}) => {
  // const dispatch = useDispatch();
  const handleStatusToggle = () => {
    // Call the parent’s function to handle the status change
    onStatusChange(id, status === "active" ? "inActive" : "active");
  };

  return (
    <Button
      onClick={handleStatusToggle}
      sx={{
        border: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        borderRadius: "12px",
        bgcolor: "#E8F5E9",
        width: "auto",
      }}
    >
      <Check style={{ color: status === "active" ? "#388E3C" : "red", marginRight: 8 }} />
      <Typography
        variant="body1"
        style={{ color: status === "active" ? "#388E3C" : "red", marginRight: 8 }}
      >
        {status}
      </Typography>
      
      <Switch
        checked={status === "active"} // Set checked based on status prop
        onChange={handleStatusToggle}
        size="small"
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#388E3C",
            "&:hover": {
              backgroundColor: "rgba(56, 142, 60, 0.08)",
            },
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#388E3C",
          },
          "& .MuiSwitch-track": {
            borderRadius: 20 / 2,
          },
        }}
      />
    </Button>
  );
};

export default StatusSwitch;
