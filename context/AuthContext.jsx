
import React, { useState, useEffect, useContext } from "react";
import getAuth from "@/util/Auth";
import { defineAbilitiesFor } from "@/util/Abilities";
import { Box, CircularProgress } from "@mui/material";

// Create a context object with default values
const AuthContext = React.createContext(undefined);

// Create a custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  // const [userId, setUserId] = useState(null);
  const [id, setUserId] = useState(null);
  const [roles, setRole] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [restaurantId, setRastaurantId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [ability, setAbility] = useState(null);

  const value = {
    isLogged,
    name,
    id,
    email,
    restaurantId,
    roles,
    loading,
    ability,
    setName,
    setEmail,
    setUserId,
  };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const fetchAuth = async () => {
      try {
        const loggedInUser = await getAuth();
        console.log("see loggedIn user", loggedInUser);
        if (loggedInUser.token) {
          setRole([...loggedInUser.roles]); // Spread into a new array reference
          setUserId(loggedInUser.id);
          setName(loggedInUser.name);
          setEmail(loggedInUser.email);
          setRastaurantId(loggedInUser.restaurantId);
          setIsLogged(true); // Set isLogged to true if token exists
          console.log("Roles set to:", loggedInUser.roles);
          console.log("ID set to:", loggedInUser.id);
          const definedAbility = defineAbilitiesFor(
            loggedInUser.roles,
            loggedInUser.id
          );
          setAbility(definedAbility);
        }
      } catch (error) {
        console.error("Error fetching auth data", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    // Fetch the logged-in user data
    fetchAuth();
  }, []);

  // If ability is still loading or undefined, show a loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
