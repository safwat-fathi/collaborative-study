import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

import "./join.css";

import Room from "../Rooms/Room";

const Join = () => {
  // app state
  const user = useSelector(selectUser);
  // rooms state call

  const dispatch = useDispatch();

  useEffect(() => {
    // getRoomsRequest();
  }, []);

  // const [filterRoom, setFilterRoom] = useState([]);
  // const [inputChar, setInputChar] = useState("");
  // useEffect(() => {
  // webSocketClient.onopen = () => {
  //   webSocketClient.send(
  //     JSON.stringify({
  //       type: "rooms",
  //       payload: rooms,
  //     })
  //   );
  // };
  // });

  // useEffect(() => {
  //   const newList =
  //     rooms &&
  //     rooms.filter((d) => inputChar === "" || d.name.includes(inputChar));

  //   setFilterRoom(newList);
  // }, [inputChar]);

  // const onChangeHandlerfilter = (e) => {
  //   setInputChar(e.target.value);
  // };

  const handleSetCurrentRoom = (roomId) => {
    // setCurrentRoom(rooms, roomId);
  };

  return (
    <>
      <div>
        <h3>You profile:</h3>
        <p>logged in as: {user.token.userName}</p>
        <p>your email: {user.token.userEmail}</p>
      </div>
      <div>
        <h3>Available rooms:</h3>
        {/* <ul>
          {rooms.length >= 1 ? (
            rooms.map((room) => {
              return (
                <li key={room._id}>
                  <Link
                    to={`rooms/${room._id}`}
                    onClick={() => handleSetCurrentRoom(room._id)}
                  >
                    {room.name}
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <p>no rooms</p>
            </li>
          )}
        </ul> */}
      </div>
    </>
  );
};

export default Join;
