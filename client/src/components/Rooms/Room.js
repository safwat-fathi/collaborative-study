import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

// components
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
import FilesList from "../FilesList";
import FileUpload from "../FileUpload";
// helpers
// import draw from "../../helpers/draw";
// import erase from "../../helpers/erase";

import "./Room.css";
const Room = () => {
  const user = useSelector(selectUser);
  // @ts-ignore
  const { id } = useParams();

  /*
   * @todo Check if user is admin
   * @body check if the current user is the room admin and based on that can be given som privileges
   */

  /*
   * @todo Close websocket when leaving room
   * @body websocket connection must be closed when user leaves the room
   */

  /*
   * @todo Monitor user connection to websocket
   * @body set a flag for user connection to the websocket client in app state
   */

  // const {
  //   // join room state
  //   currentRoom,
  //   userName,
  //   userID,
  //   webSocketClient,
  //   setWebSocketClient,
  //   // chat state
  //   messages,
  //   setMessages,
  //   // whiteboard state
  //   ctx,
  //   drawingDataFromWS,
  //   setDrawingDataFromWS,
  //   files,
  // } = useContext(RoomContext);

  useEffect(() => {
    // intiate websocket client

    // clean up to close websocket connection & send closing event to ws
    return () => {
      // websocketClient.send(
      //   JSON.stringify({
      //     type: "closing",
      //     room: currentRoom,
      //     payload: {
      //       userID: userID,
      //       userName: userName,
      //     },
      //   })
      // );
      console.log("closing room...");
    };
  }, []);

  // websocketClient.onopen = () => {
  // websocketClient.send(
  //   JSON.stringify({
  //     type: "join",
  //     room: currentRoom,
  //     payload: {
  //       userID: userID,
  //       userName: userName,
  //     },
  //   })
  // );
  //   sendMsg("join", currentRoom, { userID, userName });
  // };

  // webSocketClient.onmessage = async (e) => {
  //   try {
  //     let data = JSON.parse(e.data);
  //     const { type, payload } = data;

  //     switch (type) {
  //       case "chatting":
  //         setMessages([...messages, payload]);
  //         break;
  //       case "drawing":
  //         setDrawingDataFromWS(payload);
  //         // now we can draw with the coordinations sent by websocket :)
  //         const { x0, y0, x1, y1, color } = await drawingDataFromWS;
  //         draw(ctx, x0, y0, x1, y1, color);
  //         break;
  //       case "erasing":
  //         setDrawingDataFromWS(payload);
  //         // now we can draw with the coordinations sent by websocket :)
  //         const { x, y } = await drawingDataFromWS;
  //         erase(ctx, x, y, currentRoom);
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div className="Room">
        {/* <h1>Welcome to {currentRoom.name}</h1> */}
        <Link to="/rooms">Back to Rooms</Link>
        {/* <Whiteboard /> */}
        {/* <Chat /> */}
      </div>
      {/* <FilesList /> */}
      {/* <FileUpload /> */}
    </>
  );
};

export default Room;
