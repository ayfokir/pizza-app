// import Image from "next/image";
// import styles from "./page.module.css";
"use client";
import { Box, Typography } from "@mui/material";
import store from "@/redux/store/store";
import Navbar from "@/components/navbar/Navbar";
import MainHeading from "@/components/home/MainHeading";
import FeaturedPizzaCard from "@/components/FeaturedPizza/FeaturedPizzaCard";
import SwipperCard from "@/components/FeaturedPizza/SwipperCard";
import AllPizzas from "@/components/popular-pizza/AllPizzas";
import { Provider } from "react-redux";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import "./globals.css";
import AllRestaurant from "@/components/restaurants/AllRestaurant";
// import 'globals.css'
export default function Home() {
  return (
    // <Provider store={store}>
    <Box sx={{ backgroundColor: "#FFF8F1", minHeight: "100vh" }}>
      <Navbar />
      <MainHeading />
      <SwipperCard />
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          component={"h2"}
          sx={{
            fontSize: "35px",
            color: "#00000080",
            paddingTop: "90px",
            marginLeft: {
              xs: 1.5, // Add space from the left side for small screens
              sm: 2, // Increase the left padding for larger screens
              md: 4,
              lg: 6,
            },
          }}
        >
          Top Restaurants
        </Typography>
      </Box>
      <AllRestaurant />
      <AllPizzas />
      <Footer />
    </Box>
    // </Provider>
  );
}
