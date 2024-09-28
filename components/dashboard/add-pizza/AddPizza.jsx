"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload"; // Import upload icon
import { useDispatch, useSelector } from "react-redux";
import {
  SuccessMessage,
  FailureMessage,
} from "@/redux/slices/notificationSlice";
import { useFormStatus } from "react-dom";
import { CreateTopping } from "@/app/api/topping/CreateTopping";
import { GetToppings } from "@/app/api/topping/GetToppings";
import { CreatePizza } from "@/app/api/pizza/CreatePizza";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPizza = () => {
  //   const [topping, setTopping] = useState("");
  const [showToppingField, setShowToppingField] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState({});
  const [newTopping, setNewTopping] = useState(""); // For the add topping field
  const [toppingsList, setToppingsList] = useState([]); // State to store the fetched toppings

  // Handle toggle of checkbox selection
  const handleToppingChange = (e) => {
    setSelectedToppings({
      ...selectedToppings,
      [e.target.name]: e.target.checked,
    });
    
  };

console.log("selectedToppings:", selectedToppings)

  const handleToppingAdd = () => {
    if (showToppingField) {
      setShowToppingField(false);
    } else setShowToppingField(true);
  };

  // Fetch toppings from the server
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const result = await GetToppings();
        console.log("Fetched toppings:", result.toppings);
        setToppingsList(result.toppings); // Save the fetched toppings
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    };
    fetchToppings();
  }, [newTopping]);

  // Immediately after adding topping value send it to the backend
  useEffect(() => {
    const createTopping = async () => {
      if (newTopping && !showToppingField) {
        let result = await CreateTopping(newTopping);
        console.log("Created Topping:", result);
        if (result.success) {
          setNewTopping("");
          dispatch(SuccessMessage(result));
        } else {
          dispatch(FailureMessage(result));
        }
      }
    };
    createTopping();
  }, [newTopping, showToppingField]);

  const [pizzaData, setPizzaData] = useState({
    name: "",
    price: "",
    toppings: "", // i need to pass just the selected topping id
    pizza_photo: null,
  });

  const [errors, setErrors] = useState({});
  const { pending } = useFormStatus();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "logo") {
      // Handle file input
      setPizzaData((prevState) => ({
        ...prevState,
        logo: e.target.files[0], // Store the uploaded file in state
      }));
    } else {
      setPizzaData((prevState) => ({
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
    if (!pizzaData.name) newErrors.name = "Pizza name is required";
    // Validate toppings array (check if it's empty or not)
    // if (!pizzaData.toppings || pizzaData.toppings.length === 0) {
    //   newErrors.toppings = "At least one topping is required";
    // }
    if (!pizzaData.price) newErrors.price = "Price is required";
    if (!pizzaData.pizza_photo)
      newErrors.pizza_photo = "Pizza photo is required";
    return newErrors;
  };

  const handleSubmit = (event) => {

    const toppingIds = Object.keys(selectedToppings).filter(
        (key) => selectedToppings[key]
      );
      setPizzaData((prevState) => ({
        ...prevState,
        toppings: toppingIds,
      }));
    event.preventDefault();
    console.log("yes we are here");
    console.log(pizzaData)
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }
    console.log("below error validation");
    // Convert selectedToppings to array of topping IDs

    const formData = new FormData(event.currentTarget);
    const result = CreatePizza(formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "1155px",
        height: "925px",
        margin: "12px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ paddingTop: "44px" }}
        >
          Add Menu
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          id="name"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          required
        />
        <Typography
          variant="h6"
          component="h3"
          sx={{ my: 0.6, textAlign: "left" }}
        >
          Topping
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {toppingsList.map((topping) => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppings[topping.name] || false}
                  onChange={handleToppingChange}
                  name={topping.name}
                  sx={{
                    color: "#ff8a00",
                    padding: "8px",
                    marginRight: "5px", // Optional to add some spacing
                  }}
                />
              }
              label={topping.name}
            />
          ))}

          {/* Conditionally render the new topping field and add button */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {showToppingField && (
              <TextField
                label="Add New Topping"
                margin="normal"
                variant="outlined"
                value={newTopping}
                onChange={(e) => setNewTopping(e.target.value)}
                sx={{
                  margin: "0 10px",
                  width: "150px", // Make the width smaller
                }}
                InputProps={{
                  sx: {
                    height: "35px", // Reduce the height of the field
                    padding: "0 8px", // Adjust padding inside the input
                    fontSize: "14px", // Adjust font size (optional)
                  },
                }}
                InputLabelProps={{
                  sx: {
                    top: "-10px", // Adjust the position of the label to be aligned with the smaller input
                  },
                }}
              />
            )}

            <Button
              onClick={handleToppingAdd}
              variant="contained"
              sx={{
                backgroundColor: "#ff8a00",
                minWidth: "80px", // Smaller width
                marginLeft: "10px",
              }}
            >
              Add
            </Button>
          </Box>
        </FormGroup>

        <TextField
          fullWidth
          label="Price"
          margin="normal"
          name="price"
          id="price"
          variant="outlined"
          type="number"
          onChange={handleChange}
          required
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mx: "auto" }}
        >
          <Box width={"321px"}>
            <Button
              component="label"
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "20px",
                border: "2px dashed #CCCCCC",
                textTransform: "none",
                color: "#FF9921",
                padding: "16px",
                marginTop: "15px",
              }}
              startIcon={<UploadIcon />}
            >
              Upload Pizza Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                name="pizza_photo"
                id="pizza_photo"
                onChange={handleChange}
                required
              />
            </Button>
          </Box>
        </Box>

        <Button
          type="submit"
          disabled={pending}
          variant="contained"
          sx={{
            width: "197px",
            height: "46px",
            backgroundColor: "#ff8a00",
            textTransform: "none",
            marginTop: "68px",
          }}
        >
          {pending ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddPizza;
