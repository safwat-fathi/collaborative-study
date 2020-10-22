import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Join from "./Join";
import Room from "./Room";

// import { RoomContext } from "../../context";

const Rooms = (props) => {
  console.log(props);
  // // join room state
  // const [rooms, setRooms] = useState([]);
  // const [currentRoom, setCurrentRoom] = useState("");
  // const [userID, setUserID] = useState("");
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [webSocketClient, setWebSocketClient] = useState({});
  // // chat state
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // // whiteboard state
  // const [canvas, setCanvas] = useState(null);
  // const [ctx, setCtx] = useState(null);
  // const [drawing, setDrawing] = useState(false);
  // const [erasing, setErasing] = useState(false);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  // const [color, setColor] = useState("");
  // const [drawingDataFromWS, setDrawingDataFromWS] = useState(null);
  // // uplaod file/s state
  // const [files, setFiles] = useState(null);

  // const roomCTX = {
  //   rooms,
  //   setRooms,
  //   currentRoom,
  //   setCurrentRoom,
  //   userID,
  //   setUserID,
  //   userName,
  //   setUserName,
  //   userEmail,
  //   setUserEmail,
  //   webSocketClient,
  //   setWebSocketClient,
  //   messages,
  //   setMessages,
  //   newMessage,
  //   setNewMessage,
  //   canvas,
  //   setCanvas,
  //   ctx,
  //   setCtx,
  //   drawing,
  //   setDrawing,
  //   erasing,
  //   setErasing,
  //   x,
  //   setX,
  //   y,
  //   setY,
  //   color,
  //   setColor,
  //   drawingDataFromWS,
  //   setDrawingDataFromWS,
  //   files,
  //   setFiles,
  // };

  return (
    <Router>
      <Switch>
        <Route exact path="/rooms" component={Join} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    </Router>
  );
};

export default Rooms;
