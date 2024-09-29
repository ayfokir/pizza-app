"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuccessMessage,FailureMessage } from "@/redux/slices/notificationSlice";
import UploadIcon from "@mui/icons-material/Upload"; // Import upload icon
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Container, Divider } from "@mui/material";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { RegisterRestaurantSuperAdmin } from "@/app/api/register/RegisterRestaurantSuperAdmin";
import { useRouter } from "next/navigation";
import InputFileUpload from "./UploadLogo";
import { styled } from '@mui/material/styles';

// Styled component for visually hidden input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    name:  "",
    password: "",
    confirmPassword: "",
    phone: "",
    restaurantName: "",
    location: "",
    logo: null, // Add a property for the logo

  });

  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const { pending } = useFormStatus();
  const dispatch = useDispatch(); // Get dispatch function from Redux


   const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "terms") {
      setTermsAccepted(checked);
    } else if (name === "logo") {
      // Handle file input
      setUserData((prevState) => ({
        ...prevState,
        logo: e.target.files[0], // Store the uploaded file in state
      }));
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

    if (!userData.name) newErrors.name = "name is required";
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password !== userData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!userData.phone) newErrors.phone = "Phone number is required";
    if (!userData.restaurantName)
      newErrors.restaurantName = "Phone number is required";
    if (!userData.location) newErrors.location = "Location is required";
    if (!userData.logo) newErrors.logo = "Logo is required";

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

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }

    const formData = new FormData(e.currentTarget);
    const result = await RegisterRestaurantSuperAdmin(formData);

    console.log(result);
    if (result.success) {
     dispatch(SuccessMessage(result))
      router.push("/add-admin");
    } else {
     dispatch(FailureMessage(result))
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
          // overflowY: "auto", // Allow vertical scrolling if content overflows
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
            // required
            fullWidth
            id="name"
            label="Admin Name"
            name="name"
            // type="text"
            // autoComplete="email"
            autoFocus
            value={userData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            // autoComplete="email"
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
            // autoComplete="current-password"
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
            // required
            fullWidth
            name="restaurantName"
            label="Restaurant Name"
            id="restaurantName"
            value={userData.restaurantName}
            onChange={handleChange}
            error={Boolean(errors.restaurantName)}
            helperText={errors.restaurantName}
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
          <div>
       <Button
      component="label"
      fullWidth
      variant="outlined" // Changed to outlined for a distinct look
      sx={{
        border: "2px dashed #CCCCCC", // Dashed border style
        textTransform: "none", // Preserve text casing (PascalCase)
        color: "#FF9921", // Set text and icon color
        padding: "16px", // Add padding for a better look
        marginTop: "15px"
      }}
      startIcon={<UploadIcon />} // Add upload icon
      >
      Upload Logo
      <VisuallyHiddenInput
        type="file"
        name="logo"
        id="logo"
        onChange={handleChange}
      />
    </Button>
    {errors.logo && (
            <Typography variant="body2" color="error" sx={{ mb: 2, ml: 2 }}>
              {errors.logo}
            </Typography>
          )}
     {/* <InputFileUpload  /> */}
    </div>
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
            variant="contained" // Use "contained" to allow background color changes
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FF9921", // Set the background color
              color: "white", // Ensure text is readable by setting the color to white
              "&:hover": {
                backgroundColor: "#E6821F", // Optional: Set hover color for a darker shade
              },
              padding: "12px 16px", // Increase padding of the Login button
            }}
            disabled={pending}

            
          >
            {pending ? "Submitting..." : "Sign Up"}
          </Button>

          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{" "}
            <Link href="/login" variant="body2" sx={{color:"#FF9921"}}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
