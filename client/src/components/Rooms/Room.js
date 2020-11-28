import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { initWebSocketRequest } from "../../actions/ws.actions";
// components
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
import FilesList from "../FilesList";
import FileUpload from "../FileUpload";
// helpers
// import draw from "../../helpers/draw";
// import erase from "../../helpers/erase";

import "./Room.css";
const Room = (props) => {
  console.log(props);

  const { loginReducer, roomReducer, initWebSocketRequest } = props;
  const { user } = loginReducer;
  const { loading, adminID, currentRoom, error, rooms } = roomReducer;
  const { id } = useParams();
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
    initWebSocketRequest();
    // clean up
    return () => {
      // ws.send(
      //   JSON.stringify({
      //     type: "closing",
      //     room: currentRoom,
      //     payload: {
      //       userID: userID,
      //       userName: userName,
      //     },
      //   })
      // );
      // ws.close();
    };
  }, []);

  // webSocketClient.onopen = () => {
  //   webSocketClient.send(
  //     JSON.stringify({
  //       type: "join",
  //       room: currentRoom,
  //       payload: {
  //         userID: userID,
  //         userName: userName,
  //       },
  //     })
  //   );
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
        <h1>Welcome to {currentRoom.name}</h1>
        <Link to="/rooms">Back to Rooms</Link>
        {/* <Whiteboard /> */}
        {/* <Chat /> */}
      </div>
      {/* <FilesList /> */}
      {/* <FileUpload /> */}
    </>
  );
};
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    initWebSocketRequest: () => dispatch(initWebSocketRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
