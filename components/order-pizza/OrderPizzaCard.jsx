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
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/app/api/order/CreateOrder";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import {
  SuccessMessage,
  FailureMessage,
} from "@/redux/slices/notificationSlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function OrderPizzaCard({
  name,
  price,
  pizza_photo,
  toppings,
  restaurant,
}) {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedToppings, setSelectedToppings] = useState({});
  const [pizzaQuantity, setPizzaQuantity] = useState(1); // Default quantity set to 1
  const [toppingsId, setToppingsId] = useState([]);

  const handleOrder = async () => {
    let result = await createOrder({
      status: "Prepairing",
      customerId: userId,
      restaurantId: restaurant[0].id,
      pizzaId: "1", // Pass the pizza ID here as string
      toppings: toppingsId,
      quantity: pizzaQuantity.toString(), // Convert quantity to string
    });

    console.log(result);
    if (result.success) {
      dispatch(SuccessMessage(result));
      router.push("/your-orders");
    } else {
      dispatch(FailureMessage(result));
    }
  };

  const handleToppingChange = (id) => {
    setSelectedToppings((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the selection
    }));
  };

  useEffect(() => {
    const toppingIds = Object.keys(selectedToppings).filter(
      (id) => selectedToppings[id]
    );
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

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        backgroundColor: "#fff7ed",
        padding: "16px",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{ position: "relative", paddingTop: "100%", borderRadius: "50%" }}
      >
        <Image
          src={pizza_photo}
          alt={name}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <Box textAlign={"left"}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            {name}
          </Typography>
          {toppings.map((topping) => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppings[topping.id] || false}
                  onChange={() => handleToppingChange(topping.id)}
                  name={topping.name}
                  sx={{
                    color: "#ff8a00",
                    padding: "8px",
                    marginRight: "5px",
                  }}
                />
              }
              label={topping.name}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <IconButton onClick={decreaseQuantity}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6" component="span" sx={{ mx: 2 }}>
            {pizzaQuantity}
          </Typography>
          <IconButton onClick={increaseQuantity}>
            <AddIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="span"
            sx={{
              color: "#1faa00",
              fontWeight: "bold",
              fontSize: "36px",
              marginLeft: "16px",
            }}
          >
            {price}
            <Typography
              component="span"
              sx={{ fontSize: "18px", verticalAlign: "super" }}
            >
              Birr
            </Typography>
          </Typography>
        </Box>

        <Link href={"/your-orders"}>
          <Button
            onClick={handleOrder}
            variant="contained"
            sx={{
              borderRadius: 2,
              paddingX: 6.5,
              paddingY: 1.5,
              fontWeight: "bold",
              fontSize: "20px",
              backgroundColor: "#FF9921",
            }}
          >
            Order
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
