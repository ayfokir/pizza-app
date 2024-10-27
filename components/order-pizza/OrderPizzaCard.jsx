"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import OrderSuccessDialog from "./OrderSuccessDialog";
import Link from "next/link";
import { createOrder } from "@/app/api/orders/CreateOrder";
import { useAuth } from "@/context/AuthContext";
import {SuccessMessage,FailureMessage} from "@/redux/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { GetPizzas } from "@/app/api/pizza/GetPizzas";
import getAuth from "@/util/Auth";
export default function OrderPizzaCard() {
  const { id , email, loading} = useAuth();
  console.log("see id: ", id)
  
  const router = useRouter();
  const [selectedToppings, setSelectedToppings] = useState({});
  const [pizzaQuantity, setPizzaQuantity] = useState(1); // Default quantity set to 1
  const [toppingsId, setToppingsId] = useState([]);
  // const [id, setId]  = useState("")
  const [pizza, setPizza] = useState({});
  const [open, setOpen] = useState(false);
  
  const pizzaId = useSelector((state) => state.pizza.selectedPizzaId); // Adjust according to your pizza slice structure
  const restaurantsId = useSelector(state => state.restaurants.selectedRestaurantId); // Adjust accordingly

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("see pizzaId:", pizzaId);
  // console.log("see type of pizzaId:", typeof(pizzaId));
  // console.log("see restaurantsId:", restaurantsId);

  const handleOrder = async () => {
    let result = await createOrder({
      status: "Preparing",
      customerId: String(id),
      restaurantId: String(restaurantsId),
      pizzaId: String(pizzaId), // Pass the pizza ID here as string
      toppings: toppingsId,
      quantity: pizzaQuantity.toString(), // Convert quantity to string
    });

    console.log(result);
    if (result.success) {
      // dispatch(SuccessMessage(result));
      handleOpen()
      setTimeout(()  =>  {
        router.push('/order-history')

      }, 1000)
    } else {
      console.log("see error result:", result)
      // dispatch(FailureMessage(result));
    }
  };

  const handleToppingChange = (id) => {
    setSelectedToppings((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the selection
    }));
  };

  useEffect(() => {
    const toppingIds = Object.keys(selectedToppings)
      .filter((id) => selectedToppings[id])
      .map((id) => parseInt(id, 10)); // Wrap parseInt in a function

    setToppingsId(toppingIds);
  }, [selectedToppings]);

  // Function to increase pizza quantity
  const increaseQuantity = () => {
    setPizzaQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease pizza quantity
  const decreaseQuantity = () => {
    setPizzaQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Prevent quantity from going below 1
  };

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const pizzaData = await GetPizzas(); // Fetch all pizzas

        if (pizzaData.success) {
          // Ensure that both `pizza.id` and `selectedPizzaId` are numbers
          const parsedPizzaId = parseInt(pizzaId, 10);

          // Filter the pizza based on the parsedPizzaId
          const filteredPizza = pizzaData.pizzas.find(
            (pizza) => pizza.id === parsedPizzaId
          );

          if (filteredPizza) {
            setPizza(filteredPizza); // Set the state with the filtered pizza
          } else {
            setError("Pizza not found.");
          }
        } else {
          setError(pizzaData.message);
        }
      } catch (error) {
        setError("Failed to fetch pizzas.");
      }
    };

    if (pizzaId) {
      fetchPizza();
    }
  }, [pizzaId]);



  if (loading) {
    console.log("inside spinner")
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
<>

  {pizzaId ?  ( <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#fff7ed",
        padding: "32px",
        // borderRadius: "16px",
        // boxShadow: 3,
      }}
    >
      {/* Left-aligned large pizza image */}
      <Box sx={{ flexBasis: "50%", position: "relative" }}>
        <Box
          sx={{ position: "relative", paddingTop: "100%", borderRadius: "50%" }}
        >
          <Image
            src={pizza.pizza_photo}
            alt={pizza.name}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "50%" }}
          />
        </Box>
      </Box>
      {/* Small pizza images */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "24px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            position: "relative",
            marginRight: "12px",
          }}
        >
          <Image
            src={pizza.pizza_photo}
            alt="Small Pizza"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Box sx={{ width: "200px", height: "200px", position: "relative" }}>
          <Image
            src={pizza.pizza_photo}
            alt="Small Pizza"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "50%" }}
          />
        </Box>
      </Box>
      {/* Right side with small pizza images and order details */}
      <Box sx={{ flexBasis: "50%", marginLeft: "32px" }}>
        {/* Pizza name */}
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          {pizza.name}
        </Typography>

        {/* Toppings */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px", // Adjust gap between items
          }}
        >
          {pizza?.toppings?.map((topping) => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppings[topping.id] || false}
                  onChange={() => handleToppingChange(topping.id)}
                  name={topping.name}
                  sx={{ color: "#ff8a00", marginRight: "12px" }} // Added back marginRight
                />
              }
              label={topping.name}
              sx={{ flexBasis: "30%" }} // Ensures wrapping after 3 toppings
            />
          ))}
        </Box>

        {/* Quantity and Price */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginY: 4,
            gap: "30px",
          }}
        >
          <IconButton
            onClick={decreaseQuantity}
            sx={{
              border: "2px solid #FF9921", // Set border with the same color as order button
              borderRadius: "50%",
              padding: "8px", // Increase button size
              color: "#FF9921",
            }}
          >
            <RemoveIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6" component="span" sx={{ mx: 2 }}>
            {pizzaQuantity}
          </Typography>

          <IconButton
            onClick={increaseQuantity}
            sx={{
              border: "2px solid #FF9921", // Set border with the same color as order button
              // borderRadius: "50%",
              padding: "8px", // Increase button size
              color: "#FF9921",
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>

          {/* Added space between the count buttons and price */}
          <Typography
            variant="h4"
            sx={{
              color: "#1faa00",
              fontWeight: "bold",
              fontSize: "36px",
              marginLeft: "24px", // Adjusted gap between count buttons and price
            }}
          >
            {pizza.price}
            <Typography
              component="span"
              sx={{ fontSize: "18px", verticalAlign: "super" }}
            >
              Birr
            </Typography>
          </Typography>
        </Box>

        {/* Order Button */}
        <Button
          
          onClick={handleOrder}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 2,
            paddingX: 6.5,
            paddingY: 1.5,
            fontWeight: "bold",
            fontSize: "20px",
            backgroundColor: "#FF9921",
            display: "flex",
            justifyContent: "space-between", // Order text to start, icon to end
            alignItems: "center",
          }}
        >
          Order
          <Box component="span" sx={{ ml: 1 }}>
            {/* Arrow Icon with upward direction and increased size */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="35px"
              height="35px"
              style={{ transform: "rotate(45deg)" }} // Rotate arrow upwards
            >
              <path d="M12 2l8 8-1.4 1.4-5.6-5.6v12h-2v-12l-5.6 5.6L4 10l8-8z" />
            </svg>
          </Box>
        </Button>
        <OrderSuccessDialog open={open} onClose={handleClose} message = {"Your order has been successfully completed"} />
      </Box>
    </Box> )
: (
  <Typography variant="h5" color="error" sx={{paddingY: "60px", textAlign: "center"}}>
    {"No pizza selected. Please choose a pizza."}
  </Typography>
)
  }
  </>
  );
}
