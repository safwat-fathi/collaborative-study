import React from "react";

export const UserAuth = React.createContext({
  userAuth: false,
  setUserAuth: () => {},
});

export const IsUserTokenExpired = React.createContext({
  isUserTokenExpired: true,
  setIsUserTokenExpired: () => {},
});
