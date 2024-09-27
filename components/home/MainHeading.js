import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Image from "next/image";

const MainHeading = () => {
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      padding: "2rem 0",
      gap: "80px",
      justifyContent: "space-between", // Ensure space between the text and images
      background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 80%)", // Central shadow effect
      backgroundColor: "#fff0d6", // Light background color underneath
      borderRadius: "15px", // Optional: Adds rounded corners
      padding: "40px", // Padding around the content
      position: "relative",
    }}
  >
    {/* Text Content */}
    <Box sx={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h2" sx={{ fontWeight: "bold", color: "#f57c00" }}>
        Order us
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#777",
          margin: "1rem 0",
        }}
      >
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without.
      </Typography>
  
      {/* Search Bar */}
      <Box sx={{ margin: "1.5rem 0" }}>
        {" "}
        {/* Remove flex properties */}
        <SearchBar />
      </Box>
    </Box>
  
    {/* Image Section */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Align the box to the right side
        position: "relative", // Allow positioning of child elements
      }}
    >
      {/* Pizza Image */}
      <Box sx={{ position: "relative" }}>
        <Image src={"/pizza1.png"} width={300} height={600} alt="Pizza" />
        {/* Leaf Image */}
        <Box
          sx={{
            position: "absolute",
            top: 90, // Adjust as necessary to position the leaf
            right: -128,
            left: "50%", // Center the leaf horizontally over the pizza
            transform: "translateX(-100%)", // Offset the leaf to align it perfectly
            zIndex: 1, // Ensure it appears above the pizza
          }}
        >
          <Image src={"/leaf.png"} width={200} height={200} alt="Leaf" />{" "}
          {/* Adjust size as needed */}
        </Box>
      </Box>
    </Box>
  </Box>
  
  
  );
};

export default MainHeading;
