import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Join from "./Join";
import Room from "./Room";

import { RoomContext } from "../../context";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const Rooms = () => {
  // join room state
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [webSocketClient, setWebSocketClient] = useState({});
  // chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // whiteboard state
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [color, setColor] = useState("");
  const [drawingDataFromWS, setDrawingDataFromWS] = useState(null);

  const roomCTX = {
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    userID,
    setUserID,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    webSocketClient,
    setWebSocketClient,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    canvas,
    setCanvas,
    ctx,
    setCtx,
    drawing,
    setDrawing,
    x,
    setX,
    y,
    setY,
    color,
    setColor,
    drawingDataFromWS,
    setDrawingDataFromWS,
  };

  return (
    <RoomContext.Provider value={roomCTX}>
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route path="/rooms/:name" component={Room} />
        </Switch>
      </Router>
    </RoomContext.Provider>
  );
};

export default Rooms;
