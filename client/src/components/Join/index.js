import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import getUniqueID from "../../utils/uniqeID";
import { v4 as uuidv4 } from "uuid";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const Join = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    let userID = uuidv4();
    let roomID = uuidv4();

    setUserID(userID);
    setRoomID(roomID);
  }, []);

  const handleSubmit = (e) => {
    console.log("submitted");
    if (name === "" || room === "") {
      console.log("invalid name or room input");
      e.preventDefault();
      return;
    }
    // sending name & room data by websocket
    client.send(
      JSON.stringify({
        type: "join",
        room: {
          roomName: room,
          roomID: roomID,
        },
        payload: {
          userName: name,
          userID: userID,
        },
      })
    );
  };

  return (
    <div>
      <h2>Join</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        onChange={(e) => setRoom(e.target.value)}
      />
      <Link onClick={handleSubmit} to={`/room=${room}`}>
        <input type="submit" value="Join" />
      </Link>
    </div>
  );
};

export default Join;
