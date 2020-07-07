import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { RoomContext } from "../../context";

const Join = () => {
  const { rooms, setRooms } = useContext(RoomContext);
  const { setCurrentRoom } = useContext(RoomContext);

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
      <h2>Join a room</h2>
      {rooms.map((room) => {
        return (
          <div key={room._id}>
            <h3>{room.name}</h3>
            <p>{room.desc}</p>
            <Link
              onClick={() => setCurrentRoom(room._id)}
              to={`/room/${room._id}`}
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
