import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Join from "./Join";
import Room from "./Room";

import { RoomContext } from "../../context";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [webSocketClient, setWebSocketClient] = useState({});
  const [active, setActive] = useState(false);

  const roomCTX = {
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    userID,
    setUserID,
    userName,
    setUserName,
    webSocketClient,
    setWebSocketClient,
    active,
    setActive,
  };

  return (
    <RoomContext.Provider value={roomCTX}>
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route path="/room/:id" component={Room} />
        </Switch>
      </Router>
    </RoomContext.Provider>
  );
};

export default Rooms;
