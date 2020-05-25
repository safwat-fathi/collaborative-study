import React, { useState } from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

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
        room: room,
        message: `${name} joined!`,
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
      <Link onClick={handleSubmit} to={`/whiteboard?name=${name}&room=${room}`}>
        <input type="submit" value="Join" />
      </Link>
    </div>
  );
};

export default Join;
