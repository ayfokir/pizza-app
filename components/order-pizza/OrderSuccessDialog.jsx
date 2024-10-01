import React from "react";
import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccessDialog = ({ open, onClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm" // Wider dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px", // Rounded dialog
          padding: "32px",
          height: "400px", // Increased height of the dialog
        },
      }}
    >
      <DialogContent
        sx={{
          textAlign: "center",
          padding: "24px",
        }}
      >
        {/* Outer Circle + Inner Check Icon */}
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            marginBottom: "24px",
            height: "150px", // Define outer box size
            width: "150px",
          }}
        >
          {/* Outer Light Green Circle */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Centering the outer circle
              width: "150px",
              height: "150px",
              backgroundColor: "rgba(144, 238, 144, 0.3)", // Light green shade
              borderRadius: "50%",
            }}
          />

          {/* Inner Green Circle with Check Icon */}
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "green",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Centering the inner circle
            }}
          >
            <CheckCircleIcon sx={{ color: "white", fontSize: 80 }} />
          </Box>
        </Box>

        {/* Success Message */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "green", fontSize: "2rem" }}
        >
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessDialog;
