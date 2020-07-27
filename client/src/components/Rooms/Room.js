import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// ---------------------
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
// ---------------------
import { RoomContext } from "../../context";
import style from "./Room.module.css";
// ---------------------
import draw from "../../utils/draw";

const Room = () => {
  const {
    currentRoom,
    userName,
    setUserName,
    userID,
    setUserID,
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
  } = useContext(RoomContext);

  useEffect(() => {
    const ws = new W3CWebSocket("ws://127.0.0.1:8080");
    setWebSocketClient(ws);

    let localToken = localStorage.getItem("userToken");

    if (localToken === null) {
      console.log("not authorized");
      return;
    }

    let decodedToken = jwt_decode(localToken);
    setUserID(decodedToken.userID);
    setUserName(decodedToken.userName);
  }, []);

  useEffect(() => {
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
  });

  webSocketClient.onmessage = (e) => {
    try {
      let data = JSON.parse(e.data);
      const { type, payload } = data;

      switch (type) {
        case "chatting":
          // const { user, message } = payload;

          setMessages([...messages, payload]);
          break;
        case "drawing":
          setDrawingDataFromWS(payload);
          // now we can draw with the coordinations sent by websocket :)
          const { x0, y0, x1, y1, color } = drawingDataFromWS;
          draw(ctx, x0, y0, x1, y1, color);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.Room}>
      <Whiteboard />
      <Chat />
    </div>
  );
};

export default Room;
