import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { RoomContext } from "../../context";

const Join = () => {
  const { webSocketClient, rooms, setRooms, setCurrentRoom } = useContext(
    RoomContext
  );

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

  useEffect(() => {
    webSocketClient.onopen = () => {
      webSocketClient.send(
        JSON.stringify({
          type: "rooms",
          payload: rooms,
        })
      );
      console.log(rooms);
    };
  });

  return (
    <>
      <h2>Join a room</h2>
      {rooms.map((room) => {
        return (
          <div key={room._id}>
            <h3>{room.name}</h3>
            <p>{room.desc}</p>
            <Link
              onClick={() => setCurrentRoom(room._id)}
              to={`/room/${room.name}`}
            >
              Join {room.name}
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default Join;
