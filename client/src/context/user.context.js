import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isUserTokenExpired: true,
  setIsUserTokenExpired: () => {},
});

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserTokenExpired, setIsUserTokenExpired] = useState(true);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isUserTokenExpired,
        setIsUserTokenExpired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
