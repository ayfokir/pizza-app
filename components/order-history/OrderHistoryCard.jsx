"use client";
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image"; // for optimized image loading in Next.js

const OrderHistoryCard = ({ name, price, pizza_photo, toppings, status }) => {
  return (
    <Card
      sx={{
        width: "370px",
        borderRadius: 5,
        backgroundColor: "white",
        padding: "16px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 2, // To add space between multiple cards
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
            {toppings.map((topping) => topping.name).join(", ")}
          </Typography>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"}>
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
              {price}
              <Typography
                component="span"
                sx={{ fontSize: "18px", verticalAlign: "super" }}
              >
                Birr
              </Typography>
            </Typography>
          </Box>
          {status === "Preparing" && (
            <Typography
              variant="body2"
              color="#FF9921"
              sx={{ fontSize: "30px" }}
            >
              Ordered
            </Typography>
          )  }

           {status === "Delivered" &&  <Typography
              variant="body2"
              color="green"
              sx={{ fontSize: "30px" }}
            >
              Received
            </Typography>}
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderHistoryCard;
