"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import Image from "next/image"; // for optimized image loading in Next.js
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPizzaRequest,
  selectPizzaSuccess,
  selectPizzaFailure,
} from "@/redux/slices/selectedPizzaSlice";
import { useRouter } from "next/navigation";
export default function PizzaCard({
  pizzaId,
  name,
  price,
  pizza_photo,
  toppings,
  restaurant,
}) {
  const dispatch = useDispatch(); // Initialize useDispatch
  const router = useRouter();

  const handleOrderClick = () => {
    try {
      // Dispatching actions
      // dispatch(selectPizzaRequest()); // Set loading state

      // Select pizza with ID
      // dispatch(selectPizzaSuccess(pizzaId)); // Dispatch the pizzaId
      localStorage.setItem("selectedPizzaId", pizzaId);
      // Navigate to another page after dispatch
      router.push(`/register-customer`);
    } catch (error) {
      // Handle any error that occurs during dispatch
      dispatch(selectPizzaFailure(error.message));
    }
  };

  // Accept toppings prop
  return (
    <Card
      sx={{
        width: "370px",
        borderRadius: 5,
        backgroundColor: "white", // light background like in your design
        padding: "16px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        {/* Pizza Image */}
        <Image
          src={pizza_photo} // Use the passed pizza photo URL
          alt={name} // Use the pizza name for accessibility
          width={250}
          height={250}
        />
      </Box>

      <CardContent sx={{ textAlign: "center", marginTop: "0", padding: "0" }}>
        <Box textAlign={"left"}>
          {/* Pizza Title */}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {name} {/* Use the passed pizza name */}
          </Typography>
          {/* Toppings List */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2, width: "310px" }}
          >
            {toppings.map((topping) => topping.name).join(", ")}{" "}
            {/* Display toppings as a comma-separated string */}
          </Typography>
        </Box>
        {/* Price and Order Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{ color: "#1faa00", fontWeight: "bold", fontSize: "36px" }}
          >
            {price} {/* Main price */}
            <Typography
              component="span"
              sx={{ fontSize: "18px", verticalAlign: "super" }} // Smaller font size for "Birr"
            >
              Birr
            </Typography>
          </Typography>

          <Button
            onClick={handleOrderClick} // Attach the handler to the button
            variant="contained"
            sx={{
              borderRadius: 2,
              paddingX: 6.5,
              paddingY: 1.5,
              fontWeight: "bold",
              fontSize: "20px", // Corrected property name
              backgroundColor: "#FF9921",
            }}
          >
            Order
          </Button>
        </Box>
        {/* Profile Section */}
        <Box
          sx={{ borderTop: "1px solid #ccc", mt: 2, mb: 2, width: "100%" }}
        />{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Line under the button */}
          <Avatar
            alt="Azmera Pizza"
            src={`${restaurant[0]?.logoUrl}`} // replace with avatar image path
            sx={{ width: 70, height: 70, marginRight: 2 }}
          />
          <Typography variant="subtitle1">{restaurant[0]?.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
