import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const PizzaCard = ({ title, description, imageUrl }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2e2e2e",
        borderRadius: "40px",
        height: "386px",
        width: "1266px",
        overflow: "hidden", // This ensures content inside follows the border-radius
      }}
    >
      {/* Left Section: Text */}
      <Box sx={{ flex: 1, paddingRight: "1rem", color: "#fff", padding: "2rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f57c00", color: "#fff", padding: "0.75rem 2rem", borderRadius: "8px" }}
        >
          Order Now
        </Button>
      </Box>

      {/* Right Section: Pizza Image */}
      <Box
        sx={{
          width: "300px",
          height: "500px",
          borderRadius: "40px", // Apply border radius to the container
          overflow: "hidden", // Ensure the image respects the border-radius
        }}
      >
        <Image
          src={"/pizza1.png"}
          alt="Pizza"
          width={300}
          height={500}
        //   layout="responsive"
        />
      </Box>
    </Box>
  );
};

export default PizzaCard;
