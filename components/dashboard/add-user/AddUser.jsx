import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { GetUserRoles } from "@/app/api/user/GetUserRoles";
import { CreateUser } from "@/app/api/user/CreateUser";
import { useDispatch } from "react-redux";
import { SuccessMessage, FailureMessage } from "@/redux/slices/notificationSlice";
const MyModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [role, setRole] = useState([]);

  const [roleListes, setUserRolesList] = useState([]);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    location: false,
    phone1: false,
    phone2: false,
    role: false,
  });

  /// Fetch user roles from the server
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const result = await GetUserRoles(); // Call GetUserRoles instead of GetToppings
        console.log("Fetched user roles:", result.userRoles);
        setUserRolesList(result.userRoles); // Save the fetched user roles
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };
    fetchUserRoles();
  }, []); // Assuming `newRole` is a dependency that triggers re-fetching

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;

    if (role.includes(selectedRoleId)) {
      setRole(role.filter((r) => r !== selectedRoleId)); // Remove the role if it's already selected
    } else {
      setRole([...role, selectedRoleId]); // Add the role to the array
    }
  };
console.log("see role:", role)
  const handleSubmit = async() => {
    const newErrors = {
      name: !name,
      email: !email,
      location: !location,
      phone1: !phone1,
      phone2: !phone2,
      role: !role,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
        const registerUser = {
            name: name,
            email: email,
            phone1: phone1,
            phone2: phone2,
            location: location,
            roleIds: role, // Example role IDs
          };
          try {
            const result = await CreateUser(registerUser);
            if (result.success) {
                dispatch(SuccessMessage(result ));
                onClose(); // Close modal after successful submission
                setRoleData({ name: "", permissions: [] }); // Reset form
                // setSelectedPermissions({}); // Reset selected permissions
            } else {
                dispatch(FailureMessage(result));
            }
        } catch (error) {
            // Handle any unexpected errors
            dispatch(FailureMessage({ error: error.message || 'An unexpected error occurred' }));
        }
            }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Form Details</h2>

        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          error={errors.name}
          helperText={errors.name && "Name is required"}
        />

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          error={errors.email}
          helperText={errors.email && "Email is required"}
        />

        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
          error={errors.location}
          helperText={errors.location && "Location is required"}
        />

        <TextField
          fullWidth
          label="Phone Number 1"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
          margin="normal"
          error={errors.phone1}
          helperText={errors.phone1 && "Phone Number 1 is required"}
        />

        <TextField
          fullWidth
          label="Phone Number 2"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
          margin="normal"
          error={errors.phone2}
          helperText={errors.phone2 && "Phone Number 2 is required"}
        />

        {/* Dropdown and Add Button in a row using Box */}
        <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
          <FormControl fullWidth error={errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              {roleListes.map((roleItem) => (
                <MenuItem key={roleItem.id} value={roleItem.id}>
                  {roleItem.name}
                </MenuItem>
              ))}
            </Select>
            {errors.role && (
              <Box color="error.main" mt={1}>
                Role is required
              </Box>
            )}
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ height: "56px" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MyModal;