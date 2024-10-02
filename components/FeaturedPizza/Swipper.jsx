import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import FeaturedPizzaCard from "./FeaturedPizzaCard";

// Install the Swiper modules
SwiperCore.use([Pagination, Autoplay]);

const SwipperCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        mx: 5,
      }}
    >
      {/* Title */}
      <Typography
        paddingLeft={"80px"}
        mx={5}
        component={"h2"}
        sx={{ fontSize: "35px", color: "#00000080", paddingTop: "90px" }}
      >
        Featured Pizza
      </Typography>

      {/* Swiper Implementation */}
      <Box>
        <Swiper
          slidesPerView={1} // Show 1 card at a time
          spaceBetween={30} // Space between slides
          pagination={{ clickable: true }} // Enable clickable pagination dots
          loop={true} // Enable looping of slides
          autoplay={{
            delay: 1500, // Autoplay with shorter interval (1.5 seconds)
            disableOnInteraction: false,
          }}
        >
          {/* Render multiple FeaturedPizzaCard components as SwiperSlides */}
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default SwipperCard;
