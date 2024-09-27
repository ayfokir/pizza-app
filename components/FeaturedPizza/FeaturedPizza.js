'use client';

import { Box, Typography } from "@mui/material";
import dynamic from 'next/dynamic';

// Dynamically import Swiper and its styles to avoid SSR issues
const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then((mod) => mod.SwiperSlide), { ssr: false });

import 'swiper/css'; // Import core Swiper styles
import 'swiper/css/pagination'; // Import pagination styles
import { Pagination } from 'swiper'; // Import Swiper's Pagination module
import PizzaCard from "./PizzaCard"; // Import the PizzaCard component

const FeaturedPizza = () => {
  return (
    <Box sx={{ padding: "2rem 0", backgroundColor: "#f9f3ee", paddingLeft: "100px" }}>
      {/* Section Title */}
      <Typography variant="h4" sx={{ textAlign: "left", color: "#8a7f78", marginBottom: "1.5rem" }}>
        Featured Pizza
      </Typography>

      {/* Swiper (Slider) */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        speed={500}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <PizzaCard
            title="Make Your First Order and Get 50% Off"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without."
            imageUrl="/pizza1.png"
          />
        </SwiperSlide>

        <SwiperSlide>
          <PizzaCard
            title="Try Our New Margherita Pizza"
            description="Experience the classic taste with fresh ingredients and a delightful crust."
            imageUrl="/pizza2.png"
          />
        </SwiperSlide>

        <SwiperSlide>
          <PizzaCard
            title="Special Pepperoni Pizza"
            description="Enjoy our signature pepperoni pizza with premium ingredients."
            imageUrl="/pizza3.png"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default FeaturedPizza;
