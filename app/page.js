// import Image from "next/image";
// import styles from "./page.module.css";
import { Box } from '@mui/material';
import Navbar from "@/components/navbar/Navbar";
import MainHeading from "@/components/home/MainHeading";
import FeaturedPizza from '@/components/FeaturedPizza/FeaturedPizza';
import Restaurants from '@/components/restaurants/Restaurants';
export default function Home() {
  return (
    <Box>
    <Navbar />
    <MainHeading />
    {/* <FeaturedPizza  /> */}
    <Box

     sx={{
      display: 'flex',
      flexWrap: "nowrap",
      gap: 3,
      overflowX: 'scroll',
      padding: 2,
      scrollBehavior: 'smooth',
      '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar in WebKit-based browsers
    }}
    
    >
    <Restaurants />
    <Restaurants />
    <Restaurants />
    <Restaurants />
    <Restaurants />
    <Restaurants />
    </Box>
  </Box>
  );
}
