"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { RegisterAdmin } from "@/app/api/register/RegisterAdmin";
import { SuccessMessage,FailureMessage } from "@/redux/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
const AddAdmin = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { id , email} = useAuth();

  console.log("see user id:", id);
  console.log("see user email:", email);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const { pending } = useFormStatus();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleChange = (e) => {
    const { name, value } = e.target;
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    
    // Clear the error for the field that is being edited
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.name) newErrors.name = "Name is required";
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.phone) newErrors.phone = "Phone number is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    // Regex validation for phone number
    if (userData.phone && !/^\d+$/.test(userData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }

    //Submit user data (implement your submission logic here)
    const formData = new FormData(e.currentTarget);
    const result = await RegisterAdmin(formData);
    if (result.success) {
      dispatch(SuccessMessage(result))
      router.push("/dashboard");
      // Handle success (e.g., redirect to login)
    } else {
      dispatch(FailureMessage(result))
      // Handle error
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* Left Box: Image centered */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF9921",
          height: "100vh"
        }}
      >
        <Image src="/logo.png" width={305} height={300} alt="Logo" />
      </Box>

      {/* Right Box: Registration form */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 5, // Add some padding
          backgroundColor: "white", // Optional: set a background color if needed
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              mb: 2,
              flexShrink: 0, // Prevent the box from shrinking
              alignItems: "center", // Vertically align logo and text
              justifyContent: "flex-start", // Center the content horizontally
            }}
          >
            <Image src="/logo.png" width={51} height={50} alt="Logo" />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ mt: 0.5, ml: 1, color: "#AF5901" }}
            >
              Pizza
            </Typography>
          </Box>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: "100%",
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={userData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            // autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FF9921",
              color: "white",
              "&:hover": {
                backgroundColor: "#E6821F",
              },
            }}
            disabled={pending}
          >
            {pending ? "Submitting..." : "Continue"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdmin;
