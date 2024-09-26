import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      fullWidth
      sx={{
        maxWidth: "500px",
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
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon sx={{ color: "#f57c00" }} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
