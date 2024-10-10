import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const FeaturedPizzaCard = ({ title, description, imageUrl }) => {
  return (
    <Box
    // sx={{
    //   display: "flex",
    //   justifyContent: "center",
    //   flexDirection: "column",
    //   mx: 5,
    // }}
    >
      {/* <Typography
        paddingLeft={"80px"}
        mx={5}
        component={"h2"}
        sx={{ fontSize: "35px", color: "#00000080", paddingTop: "90px" }}
      >
        Featured Pizza
      </Typography> */}

      <Box display={"flex"} justifyContent={"center"} marginTop={2}>
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
          <Box
            sx={{
              paddingRight: "1rem",
              color: "#fff",
              padding: "2rem",
              width: "520px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "1rem",
                lineHeight: "48px",
                fontSize: {
                  xs: "25px", // for screens <600px
                  sm: "35px", // for screens ≥600px
                  md: "40px", // for screens ≥900px
                  lg: "45px", // for screens ≥1200px
                },
                fontFamily: "Roboto, sans-serif", // Set font family to Roboto
              }}
            >
              Make Your First Order and get 50% Off
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "2rem",
                lineHeight: "23px",
                fontSize: {
                  xs: "12px", // for screens <600px
                  sm: "13px", // for screens ≥600px
                  md: "14px", // for screens ≥900px
                  lg: "16px", // for screens ≥1200px
                },
              }}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f57c00",
                color: "#fff",
                padding: "0.75rem 2rem",
                borderRadius: "4px",
                width: "248px",
                width: {
                  xs: "190px", // for screens <600px
                  sm: "180px", // for screens ≥600px
                  md: "200px", // for screens ≥900px
                  lg: "248px", // for screens ≥1200px
                },
              }}
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
        <Box></Box>
      </Box>
    </Box>
  );
};

export default FeaturedPizzaCard;
