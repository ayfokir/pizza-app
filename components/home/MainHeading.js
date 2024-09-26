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
        backgroundColor: "#fff0e7",
        gap: "80px",
        justifyContent: "space-between", // Ensure space between the text and images
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
    commonly used to demonstrate the visual form of a document or a
    typeface without.
  </Typography>

  {/* Search Bar */}
  <Box sx={{ margin: "1.5rem 0" }}> {/* Remove flex properties */}
    <SearchBar />
  </Box>
</Box>


   {/* Images Section */}
{/* Images Section */}
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end", // Align the box to the right side
  }}
>
  {/* Leaf Image */}
  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
    <Image src={"/leaf.png"} width={300} height={300} alt="Leaf" />
  </Box>
  {/* Pizza Image */}
  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
    <Image src={"/pizza1.png"} width={300} height={600} alt="Pizza" />
  </Box>
</Box>


    </Box>
  );
};

export default MainHeading;
