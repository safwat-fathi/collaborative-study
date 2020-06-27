import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import Join from "./Join";
import Room from "./Room";

import { RoomContext } from "../../context";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const roomCTX = {
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
  };

  return (
    <RoomContext.Provider value={roomCTX}>
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Room path="/room/:id" component={Room} />
        </Switch>
      </Router>
    </RoomContext.Provider>
  );
};

export default Rooms;
