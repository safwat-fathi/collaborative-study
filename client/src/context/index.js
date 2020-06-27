import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isUserTokenExpired: true,
  setIsUserTokenExpired: () => {},
});

export const RoomContext = createContext({
  rooms: [],
  setRooms: () => {},
  currentRoom: "",
  setCurrentRoom: () => {},
});
