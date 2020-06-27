import React, { useEffect, useState } from "react";
import axios from "axios";

import Join from "./Join";

import { RoomContext } from "../../context";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const roomCTX = {
    rooms,
    setRooms,
  };

  return (
    <RoomContext.Provider value={roomCTX}>
      <Join />
    </RoomContext.Provider>
  );
};

export default Rooms;
