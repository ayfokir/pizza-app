import React, { useEffect, useState } from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { updateUserStatusRequest } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { SuccessMessage, FailureMessage } from "@/redux/slices/notificationSlice";

const StatusSwitch = ({ userId, status }) => {
  const dispatch = useDispatch();

  const handleStatus = () => {
    // Toggle status
    if (status === "active") {
      dispatch(updateUserStatusRequest({ userId, status: "inActive" }));
    } else {
      dispatch(updateUserStatusRequest({ userId, status: "active" }));
    }
  };

  const userStatus = useSelector((state) => state.users);
  
  useEffect(() => {
    if (userStatus.status === "succeeded") {
      dispatch(SuccessMessage({ message: userStatus.message }));
    } else if (userStatus.status === "failed") {
      dispatch(FailureMessage({ error: userStatus.error }));
    }
  }, [userStatus.status, userStatus.message, userStatus.error]);

  return (
    <Button
      onClick={handleStatus}
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
        onChange={handleStatus}
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
