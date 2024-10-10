import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import FeaturedPizzaCard from "./FeaturedPizzaCard";

const SwipperCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        // mx: 5,
        mx: {
          xs: 0, // for screens <600px
          sm: 3, // for screens ≥600px
          md: 4, // for screens ≥900px
          lg: 5, // for screens ≥1200px
        }
        // height: "186px"
      }}
    >
      {/* Title */}
      <Typography
        // paddingLeft={"80px"}
        // mx={5}
        component={"h2"}
        sx={{
          fontSize: "35px", 
          color: "#00000080",
          paddingTop: "90px",
          paddingLeft:{
            xs: "6px", // for screens <600px
            sm: "11px", // for screens ≥600px
            md: "30px", // for screens ≥900px
            lg: "80px", // for screens ≥1200px
          },
        textAlign: "left"
        
        }}
      >
        Featured Pizza
      </Typography>

      <Box>
        <Swiper
          className="feedback-slider"
          slidesPerView={1} // Display one slide at a time on smaller screens
          spaceBetween={100}
          pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
          autoplay={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            // Configure for larger screens
            900: {
              slidesPerView: 1, // Display two slides at a time on larger screens
            },
          }}
        >
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeaturedPizzaCard />
          </SwiperSlide>
          {/* Pagination outside the Swiper component */}
        </Swiper>

        {/* Separate pagination container */}
        <Box
          className="custom-swiper-pagination"
          sx={{ mt: 2, textAlign: "center" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default SwipperCard;
