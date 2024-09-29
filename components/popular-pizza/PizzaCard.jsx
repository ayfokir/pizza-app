'use client'

import React from "react";
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
export default function PizzaCard({
  name,
  price,
  pizza_photo,
  toppings,
  restaurant,
}) {

  // Accept toppings prop
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        backgroundColor: "#fff7ed", // light background like in your design
        padding: "16px",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{ position: "relative", paddingTop: "100%", borderRadius: "50%" }}
      >
        {/* Pizza Image */}
        <Image
          src={pizza_photo} // Use the passed pizza photo URL
          alt={name} // Use the pizza name for accessibility
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "50%" }} // Circular image
        />
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <Box textAlign={"left"}>
          {/* Pizza Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            {name} {/* Use the passed pizza name */}
          </Typography>
          {/* Toppings List */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
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

          <Link href={"/register-customer"}>
              <Button
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
          </Link>
        </Box>

        {/* Profile Section */}
        <Box sx={{ borderTop: "1px solid #ccc", mt: 2, mb: 2, width: "100%" }} />{" "}
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
            src={`${restaurant[0].logoUrl}`} // replace with avatar image path
            sx={{ width: 70, height: 70, marginRight: 2 }}
          />
          <Typography variant="subtitle1">{restaurant[0].name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
