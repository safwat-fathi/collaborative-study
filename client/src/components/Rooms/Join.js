import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { RoomContext } from "../../context";

const Join = () => {
  const { rooms, setRooms } = useContext(RoomContext);
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);

  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/rooms")
      .then((res) => {
        let data = res.data;
        setRooms(data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h3>Join a room</h3>
      {rooms.map((room) => {
        return (
          <div key={room._id}>
            <h4>{room.name}</h4>
            <h4>{room.desc}</h4>
            <Link to={`/room/${room._id}`}>Join {room.name}</Link>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default Join;
