import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const RelatedPizzaCard = ({ pizzaId, name, price, pizza_photo, toppings }) => {
  // console.log("toppings:", toppings);
  return (
    <Link href={"/"}>
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
          <Box textAlign={"center"}>
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
          ></Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RelatedPizzaCard;
