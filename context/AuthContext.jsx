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
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  
  const value = { isLogged, role, userId, setRole, setIsLogged, setUserId };
  
  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInUser = getAuth();
    loggedInUser.then((response) => {
      if (response.token) {
        setRole(response.role);
        setUserId(response.user_id);
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
