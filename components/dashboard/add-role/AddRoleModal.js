"use client";
import React, { useEffect, useState } from "react";
import { TextField, Checkbox, FormGroup, FormControlLabel, Button, Typography, Box, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { SuccessMessage, FailureMessage } from "@/redux/slices/notificationSlice";
import { GetPermissions } from "@/app/api/permission/GetPermissions"; // Assuming you have this API function
import { createUserRole } from "@/app/api/role/createUserRole";
import { useAuth } from "@/context/AuthContext";
const AddRoleModal = ({ open, onClose }) => {
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [permissionsList, setPermissionsList] = useState([]);
  const dispatch = useDispatch();
  const {id, restaurantId}   = useAuth();
  console.log("see the current UserId:", id)
  console.log("see the current restaurantId:", restaurantId)
  // Fetch permissions from the server
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const result = await GetPermissions(); // Fetch permissions dynamically
        console.log("Permissions fetched:", result);
        setPermissionsList(result.permissions); // Save the fetched permissions
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

  const [roleData, setRoleData] = useState({
    name: "",
    permissions: [], // Store selected permissions (IDs)
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!roleData.name) newErrors.name = "Role name is required";
    if (!roleData.permissions.length) newErrors.permissions = "At least one permission is required";
    return newErrors;
  };

  const handleSubmit = async(event) => {
      event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }
    //Call API to create a new role 
    try {
        const result = await createUserRole(roleData.name, roleData.permissions, restaurantId);
        if (result.success) {
          dispatch(SuccessMessage(result));
          onClose(); // Close modal after successful submission
          setRoleData({ name: "", permissions: [] }); // Reset form
          setSelectedPermissions({}); // Reset selected permissions
        } else {
          dispatch(FailureMessage(result));
        }
      } catch (error) {
        // Handle any unexpected errors
        dispatch(FailureMessage({ error: error.message || 'An unexpected error occurred' }));
      }
  };

  const handlePermissionChange = (id) => {
    setSelectedPermissions((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the selection
    }));
  };
useEffect(()  =>  {
      // Convert selectedPermissions to an array of selected permission IDs
      const permissionIds = Object.keys(selectedPermissions)
      .filter((id) => selectedPermissions[id]) // Filter out unselected permissions
      .map((id) => parseInt(id, 10)); // Convert string IDs to numbers
    
    setRoleData((prevState) => ({
      ...prevState,
      permissions: permissionIds,
    }));
},[selectedPermissions])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "400px",
          height: "auto",
          margin: "auto",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: 1,
          mt: 8, // Margin from top to center the modal
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center all content
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Add Role
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 400, width: "100%", textAlign: "center" }}
        >
          <TextField
            fullWidth
            label="Role Name"
            name="name"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <Typography variant="h6" component="h3" sx={{ my: 1, textAlign: "left" }}>
            Permissions
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {permissionsList.map((permission, index) => {
              // Check if the current index is even to create a new row
              if (index % 2 === 0) {
                return (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 1 }}
                    key={permission.id}
                  >
                    {/* Render the first permission */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!selectedPermissions[permission.id]}
                          onChange={() => handlePermissionChange(permission.id)}
                        />
                      }
                      label={permission.name}
                      sx={{ flex: 1 }} // Flex for equal spacing
                    />
                    {/* Check if there is a next permission to display in the same row */}
                    {permissionsList[index + 1] && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!selectedPermissions[permissionsList[index + 1].id]}
                            onChange={() => handlePermissionChange(permissionsList[index + 1].id)}
                          />
                        }
                        label={permissionsList[index + 1].name}
                        sx={{ flex: 1 }} // Flex for equal spacing
                      />
                    )}
                  </Box>
                );
              }
              return null; // Return null for odd indexed permissions to avoid duplication
            })}
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              height: "46px",
              backgroundColor: "#ff8a00",
              textTransform: "none",
              marginTop: "20px",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddRoleModal;
