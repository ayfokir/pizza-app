import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Image from "next/image";

const MainHeading = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Keep the row layout on all screen sizes
          padding: "2rem 0",
          marginTop: {
            xs: "30px",
            sm: "40px",
            md: "50px",
            lg: "60px",
          },
          justifyContent: "space-between",
          alignItems: "center", // Vertically center the content
          background: "radial-gradient(ellipse 160% 70% at 50% 50%, rgba(255, 178, 102, 0.6) 20%, rgba(255, 224, 179, 0.5) 40%, rgba(255, 240, 204, 0.2) 60%, rgba(255, 255, 255, 0) 80%)",
          minHeight: "100vh", // Ensures the gradient covers the full height of the page
          // padding: "2rem 0",
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            maxWidth: {
              xs: "200px",
              sm: "400px",
              md: "500px",
              lg: "900px",
            },
            paddingLeft: {
              xs: "10px",
              sm: "20px",
              md: "30px",
              lg: "90px",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#f57c00",
              fontSize: {
                xs: "40px", // for screens <600px
                sm: "55px", // for screens ≥600px
                md: "70px", // for screens ≥900px
                lg: "80px", // for screens ≥1200px
              },
            }}
          >
            Order us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#777",
              margin: "1rem 0",
              fontSize: {
                xs: "14px", // for screens <600px
                sm: "18px", // for screens ≥600px
                md: "22px", // for screens ≥900px
                lg: "25px", // for screens ≥1200px
              },
            }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
          </Typography>

          {/* Search Bar */}
          <Box sx={{ margin: "1.5rem 0" }} width={"100%"}>
            <SearchBar />
          </Box>
        </Box>

        {/* Image Content */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            width: {
              xs: "150px", // Adjusted width for small screens
              sm: "200px",
              md: "300px",
              lg: "350px",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "150px", // Smaller width for small screens
                sm: "200px",
                md: "250px",
                lg: "300px",
              },
              height: {
                xs: "300px", // Smaller height for small screens
                sm: "400px",
                md: "500px",
                lg: "600px",
              },
              maxWidth: "100%", // Ensures the image doesn't overflow its container
              maxHeight: "100%", // Ensures the image height doesn't exceed the container
              position: "relative",
            }}
          >
            <Image
              src={"/pizza1.png"}
              alt="Pizza"
              layout="fill" // Let Next.js control size responsively
              objectFit="contain" // Ensures the image scales without cropping or distorting
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              // top: 90,
              right: {
                lg: -90,
                md: -100,
                sm: -110,
                xs: -120,
                // top: 30,
              },
              top :{
              sm: 0,
              xs: 0,
              md: 90
              },
              left: "50%",
              transform: "translateX(-100%)",
              zIndex: 1,
            }}
          >
            <Image src={"/leaf.png"} width={200} height={200} alt="Leaf" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainHeading;
