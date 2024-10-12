import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <TextField
    variant="outlined"
    placeholder="Search"
    fullWidth
    sx={{
      height: {
        md: "60px", 
        lg: "70px",
        // sm: "50px"
      },
      width: {
        xs: "180px", 
        sm: "350px", 
        md: "450px", 
        lg: "548px",
      },
      margin: "2rem auto",
      borderRadius: "30px",
      backgroundColor: "#fff",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove border
      },
      "& .MuiInputBase-input": {
        padding: "0 16px", // Adjust padding to control horizontal positioning
        height: "65px", // Ensure the input takes full height
        display: "flex",
        alignItems: "center", // Vertically center the placeholder text
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment
          position="end"
          sx={{
            right: "6px", 
            top: {
              md: 2,
              lg: 8,
            },
          }}
        >
          <IconButton
            edge="end"
            sx={{
              backgroundColor: "#f57c00", // Set background color for the icon button
              borderRadius: "50%", // Make it circular
              width: {
                xs: "40px",
                sm: "40px",
                md: "50px",
                lg: "50px",
              },
              height: {
                xs: "40px",
                sm: "40px",
                md: "50px",
                lg: "50px",
              },
              padding: "10px", // Add padding inside the icon
              marginTop: {
                    lg: "5px",
                    md:  "-4px",
              } ,
              "&:hover": {
                backgroundColor: "#f57c00", // Keep the same color on hover
              },
            }}
          >
            <SearchIcon
              sx={{
                color: "#fff",
                fontSize: {
                  xs: "14px",
                  sm: "18px",
                  md: "22px",
                  lg: "25px",
                },
              }}
            />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
  
  
  );
};

export default SearchBar;
