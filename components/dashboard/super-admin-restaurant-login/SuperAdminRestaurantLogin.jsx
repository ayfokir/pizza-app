"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import {SuccessMessage, FailureMessage,} from "@/redux/slices/notificationSlice";
import UploadIcon from "@mui/icons-material/Upload"; // Import upload icon
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/app/api/login/Login";

const LoginAdmin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "remember") {
      setRememberMe(checked);
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    // Clear the error for the field that is being edited
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

    // // Clear fields on component mount
    // useEffect(() => {
    //   setUserData({ email: '', password: '' });
    // }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }

    // Handle login logic here
    const result = await LoginUser(userData); // Replace with your actual login function
    
    if (result.success) {
      const token = result.token;
      // const expirationTime = new Date().getTime() + (2 * 60 * 1000); // Set expiration time for 2 minutes from now
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Set expiration time for 24 hours from now
      const customerData = {
        token: token,
        expiration: expirationTime,
      };
      localStorage.setItem("customer", JSON.stringify(customerData));

      dispatch(SuccessMessage(result));
      router.push("/dashboard"); // Redirect to the dashboard or home page
    } else {
      dispatch(FailureMessage(result));
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: "40px" }}>
      {/* Left Box: Image centered */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF9921",
          paddingRight: 4, // Increase space between logo and form
          height: "100vh",
        }}
      >
        <Image src="/logo.png" width={305} height={300} alt="Logo" />
      </Box>

      {/* Right Box: Login form */}
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
            alignItems: "flex-start", // Align items to the left
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
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 1, alignSelf: "flex-start" }}
          >
            Login
          </Typography>
          <Box sx={{ borderTop: "1px solid #ccc", mb: 2, width: "100%" }} />{" "}
          {/* Line under the button */}
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
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            autoComplete="off" // Disable autofill
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            autoComplete="off" // Disable autofill
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                color="primary"
                checked={rememberMe}
                onChange={handleChange}
              />
            }
            label="Remember Me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained" // Use "contained" to allow background color changes
            sx={{
              mt: 3,
              mb: 1, // Reduced space to add line beneath
              backgroundColor: "#FF9921", // Set the background color
              color: "white", // Ensure text is readable by setting the color to white
              "&:hover": {
                backgroundColor: "#E6821F", // Optional: Set hover color for a darker shade
              },
              padding: "12px 16px", // Increase padding of the Login button
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Don't have an account?{" "}
            <Link
              href="/super-admin-restaurant-registration"
              variant="body2"
              sx={{ color: "#FF9921" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAdmin;
