import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import { RoomContext } from "../../context";

const Join = () => {
  const { rooms, setRooms } = useContext(RoomContext);
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
          </div>
        );
      })}
    </>
  );
};

export default Join;
