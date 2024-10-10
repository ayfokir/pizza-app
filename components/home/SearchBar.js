import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      fullWidth
      sx={{
        // maxWidth: "548px",
        height:  {
          md: "60px", 
          lg: "70px", 
        },
        width: {
          xs: "180px", 
          sm: "350px", 
          md: "450px", 
          lg: "548px", 
        },
        // maxWidth : {
        //   xs: "250px", 
        //   sm: "350px", 
        //   md: "450px", 
        //   lg: "548px", 
        // },
        // width : "100%",
        margin: "2rem auto",
        borderRadius: "30px",
        backgroundColor: "#fff",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove border
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                position: "relative", // Ensures we can position the icon correctly
                right: "6px", // Small distance from the right side
                top: "2px", // Adjust the top distance to center the icon vertically
                top: {
                  md: 2,
                  lg: 8
                }
              }}
            >
              <IconButton
                edge="end"
                sx={{
                  backgroundColor: "#f57c00", // Set background color for the icon button
                  borderRadius: "50%", // Make it circular
                  width: {
                    xs: "40px", // for screens <600px
                    sm: "40px", // for screens ≥600px
                    md: "50px", // for screens ≥900px
                    lg: "50px", // for screens ≥1200px
                  },
                  height: {
                    xs: "40px", // for screens <600px
                    sm: "40px", // for screens ≥600px
                    md: "50px", // for screens ≥900px
                    lg: "50px", // for screens ≥1200px
                  },
                  // maxWidth: "100%",
                  
                  // width: "50px", // Adjust size for proper alignment
                  // height: "50px",
                  padding: "10px", // Add padding inside the icon
                  "&:hover": {
                    backgroundColor: "#f57c00", // Keep the same color on hover
                  },
                }}
              >
                <SearchIcon
                  sx={{
                    color: "#fff",
                    
                    fontSize: {
                      xs: "14px", // for screens <600px
                      sm: "18px", // for screens ≥600px
                      md: "22px", // for screens ≥900px
                      lg: "25px", // for screens ≥1200px
                    },
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
