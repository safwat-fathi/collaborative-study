import React from "react";

import Rooms from "../Rooms/index";
// import splashimage from "./splash.jpeg";
import { RoomProvider, UserProvider } from "../../context";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <RoomProvider>
        <Rooms />
      </RoomProvider>
    </UserProvider>
  );
};

export default App;
