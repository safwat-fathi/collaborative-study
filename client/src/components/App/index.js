import React, { useEffect } from "react";

// utils
import { useUserContext, RoomProvider, UserProvider } from "../../context";
// components
import Rooms from "../Rooms";
import { login } from "../../services/user.services";
// resources
// import splashimage from "./splash.jpeg";
import "./App.css";

const App = () => {
  // const { setIsLoggedIn, setIsUserTokenExpired } = useUserContext();
  login("doby@test.com", "123");
  return (
    <UserProvider>
      <RoomProvider>
        <Rooms />
      </RoomProvider>
    </UserProvider>
  );
};

export default App;
