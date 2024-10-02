// import Image from "next/image";
// import styles from "./page.module.css";
"use client";
import { Box, Typography } from "@mui/material";
import store from "@/redux/store/store";
import Navbar from "@/components/navbar/Navbar";
import MainHeading from "@/components/home/MainHeading";
import FeaturedPizzaCard from "@/components/FeaturedPizza/FeaturedPizzaCard";
import SwipperCard from "@/components/FeaturedPizza/Swipper";
import AllPizzas from "@/components/popular-pizza/AllPizzas";
import { Provider } from "react-redux";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import AllRestaurant from "@/components/restaurants/AllRestaurant";
export default function Home() {

  return (
    <Provider store={store}>
      <Box sx={{ backgroundColor: "#FFF8F1" }}>
        <Navbar />
        <MainHeading />
        <SwipperCard  />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography paddingLeft={"35px"}  component={"h2"}  sx={{fontSize:"35px", color: "#00000080", paddingTop: "90px"}}>Top Restaurants</Typography>
        </Box>
      <AllRestaurant />
        <AllPizzas />
        <Footer />
      </Box>
    </Provider>
  );
}
