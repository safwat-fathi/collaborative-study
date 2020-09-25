import React from "react";

// import Rooms from "../Rooms/index";
import Login from "../Home/Login";
import Register from "../Home/Register";
// import splashimage from "./splash.jpeg";
import { RoomProvider, UserProvider } from "../../context";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <RoomProvider>
        <Login />
        <Register />
      </RoomProvider>
    </UserProvider>
  );
};

export default App;
