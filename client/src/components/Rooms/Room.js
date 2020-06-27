import React, { useContext, useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// ---------------------
import Whiteboard from "../Whiteboard";
import Chat from "../Chat";
// ---------------------
import { RoomContext } from "../../context";
// import style from "./Room.module.css";

// const client = new W3CWebSocket("ws://127.0.0.1:8080");

const Room = () => {
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);
  // componentDidMount() {
  //   this.client.onopen = () => {
  //     this.client.send(
  //       JSON.stringify({
  //         type: "join",
  //         room: this.state.room,
  //         payload: {
  //           userName: this.state.userName,
  //           userID: this.state.userID,
  //         },
  //       })
  //     );
  //   };
  //   // this.client.onmessage = (e) => {
  //   //   let data = JSON.parse(e.data);
  //   //   if (data.type === "user data") {
  //   //     this.setState({
  //   //       userID: data.message,
  //   //     });
  //   //   }
  //   // };
  // }

  useEffect(() => {
    console.log(currentRoom);
  }, []);

  return (
    <>
      {/* <Whiteboard
        client={this.client}
        roomData={{
          room: this.state.room,
          userID: this.state.userID,
          userName: this.state.userName,
        }}
      />
      <Chat
        client={this.client}
        roomData={{
          room: this.state.room,
          userID: this.state.userID,
          userName: this.state.userName,
        }}
      /> */}
    </>
  );
};

export default Room;
