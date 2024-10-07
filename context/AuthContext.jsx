import React, { useState, useEffect, useContext } from 'react';
import getAuth from '@/util/Auth';

// Create a context object with default values
const AuthContext = React.createContext(undefined);

// Create a custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
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
  
  const value = { isLogged, name, id, email, restaurantId, roles,setName, setEmail, setUserId };
  
  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInUser =  getAuth();
    loggedInUser.then((response) => {
      if (response.token) {
        console.log("loggedInUser",response)
        setRole(response.roles);
        setName(response.name);
        setEmail(response.email);
        setRastaurantId(response.restaurantId);
        setUserId(response.id);
        setIsLogged(true); // Set isLogged to true if token exists
      }
    });
  }, []);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
