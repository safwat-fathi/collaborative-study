import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// ---------------------
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
// ---------------------
import { RoomContext } from "../../context";
import style from "./Room.module.css";

const Room = () => {
  const {
    currentRoom,
    userName,
    setUserName,
    userID,
    setUserID,
    webSocketClient,
    setWebSocketClient,
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

  return (
    <div className={style.Room}>
      <Whiteboard />
      <Chat />
    </div>
  );
};

export default Room;
