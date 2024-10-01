"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";
import Image from "next/image";
import { useFormStatus } from "react-dom";
// import { CreateCustomer } from "@/app/api/register-customer/CreateCustomer";
import { SuccessMessage, FailureMessage } from "@/redux/slices/notificationSlice";
// import { useDispatch, useSelector } from "react-redux";
import { CreateCustomer } from "@/app/api/register-customer/CreateCustomer";
import { useDispatch, useSelector } from "react-redux";


const RegisterCustomer = () => {

  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    location: "", // New location field
    password: "",
    confirmPassword: "",
    termsAccepted: false, // Track terms acceptance
  });

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const { pending } = useFormStatus();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the error for the field that is being edited
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.phone) newErrors.phone = "Phone number is required";
    if (!userData.location) newErrors.location = "Location is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    // Regex validation for phone number
    if (userData.phone && !/^\d+$/.test(userData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    if (!userData.termsAccepted) newErrors.terms = "You must accept the Terms and Conditions";

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

    // Submit user data (implement your submission logic here)
    const formData = new FormData(e.currentTarget);
    const result = await CreateCustomer(formData);
    if (result.success) {
      dispatch(SuccessMessage(result));
      router.push("/order");
      // Handle success (e.g., redirect to login)
    } else {
      dispatch(FailureMessage(result));
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
          height: "100vh",
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
            id="email"
            label="Email Address"
            name="email"
            type="email"
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
            name="location"
            label="Location"
            id="location"
            value={userData.location}
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
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

          {/* Terms and Conditions checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                color="primary"
                checked={userData.termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the Terms and Conditions"
          />
          {errors.terms && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.terms}
            </Typography>
          )}

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
              padding: "12px 16px", // Increase padding of the Login button
            }}
            disabled={pending}
          >
            {pending ? "Submitting..." : "Continue"}
          </Button>

          {/* Already have an account text */}
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" sx={{ color: "#FF9921" }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterCustomer;
