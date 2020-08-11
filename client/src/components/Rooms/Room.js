import React, { useContext, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// ---------------------
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
// ---------------------
import { RoomContext } from "../../context";
import "./Room.css";
// ---------------------
import draw from "../../utils/draw";

const Room = () => {
  const {
    // join room state
    currentRoom,
    userName,
    userID,
    webSocketClient,
    setWebSocketClient,
    // chat state
    messages,
    setMessages,
    // whiteboard state
    ctx,
    drawingDataFromWS,
    setDrawingDataFromWS,
  } = useContext(RoomContext);

  useEffect(() => {
    const ws = new W3CWebSocket("ws://127.0.0.1:8080");
    setWebSocketClient(ws);

    let localToken = localStorage.getItem("userToken");

    if (localToken === null) {
      console.log("not authorized");
      return;
    }

    return () => {
      ws.send(
        JSON.stringify({
          type: "closing",
          room: currentRoom,
          payload: {
            userID: userID,
            userName: userName,
          },
        })
      );

      ws.close();
    };
  }, []);

  webSocketClient.onopen = () => {
    webSocketClient.send(
      JSON.stringify({
        type: "join",
        room: currentRoom,
        payload: {
          userID: userID,
          userName: userName,
        },
      })
    );
  };

  webSocketClient.onmessage = async (e) => {
    try {
      let data = JSON.parse(e.data);
      const { type, payload } = data;

      switch (type) {
        case "chatting":
          setMessages([...messages, payload]);
          break;
        case "drawing":
          setDrawingDataFromWS(payload);
          // now we can draw with the coordinations sent by websocket :)
          const { x0, y0, x1, y1, color } = await drawingDataFromWS;
          draw(ctx, x0, y0, x1, y1, color);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Room">
      <Whiteboard />
      <Chat />
    </div>
  );
};

export default Room;
