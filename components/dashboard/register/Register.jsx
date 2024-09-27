"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUserRequest } from "@/redux/slices/userSlice";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Container,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { RegisterUser } from "@/app/api/register/RegisterUser";
import { useRouter } from "next/navigation";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
  });

  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const { pending } = useFormStatus();
  const { setNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "terms") {
      setTermsAccepted(checked);
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

  const validateForm = () => {
    const newErrors = {};

    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password !== userData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!userData.location) newErrors.location = "Location is required";
    if (!userData.phone) newErrors.phone = "Phone number is required";

    // Regex validation for phone number
    if (userData.phone && !/^\d+$/.test(userData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    if (!termsAccepted)
      newErrors.terms = "You must accept the Terms and Conditions";

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

    const formData = new FormData(e.currentTarget);
    const result = await RegisterUser(formData);
    addUserRequest(formData)
    // console.log(result);
    // if (result.success) {
    //   setNotification({
    //     status: "success",
    //     message: result.message || "User successfully Registered.",
    //   });
    //   router.push("/login");
    // } else {
    //   setNotification({
    //     status: "error",
    //     message: (result.error) || "User Registration failed.",
    //   });
    // }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Left Box: Image centered */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(23,27,54)",
        }}
      >
        <Image src="/logo/book.png" width={200} height={200} alt="Logo" />
      </Box>

      {/* Right Box: Registration form */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 15, // Add some padding
          overflowY: "auto", // Allow vertical scrolling if content overflows
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
              overflow: "hidden", // Ensure no content gets clipped
            }}
          >
            <Image src="/logo/book.png" width={60} height={40} alt="Logo" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ ml: 2 }}>
              Book Rent
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ width: "100%" }}
          >
            Signup into Book Rent
          </Typography>
          <Divider sx={{ width: "100%", mb: 2 }} />
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
            // required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={userData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            // required
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
          <TextField
            margin="normal"
            // required
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
            // required
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                color="primary"
                checked={termsAccepted}
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
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={pending}
          >
            {pending ? "Submitting..." : "Sign Up"}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{" "}
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
      <Notification />
    </Box>
  );
};

export default Register;
