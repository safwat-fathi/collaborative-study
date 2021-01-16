import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../userSlice";
import { setCurrentRoom, getRoomsRequest, selectRoom } from "../../roomSlice";

import "./join.css";

const Join = () => {
  const dispatch = useDispatch();

  // app state
  const userState = useSelector(selectUser);
  const roomState = useSelector(selectRoom);

  useEffect(() => {
    // getRoomsRequest();
    dispatch(getRoomsRequest());
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

  const handleSetCurrentRoom = (roomID) => {
    // set current room in room state
    dispatch(setCurrentRoom(roomState.rooms, roomID));
  };

  return (
    <>
      <div>
        <h3>You profile:</h3>
        <p>logged in as: {userState.token.userName}</p>
        <p>your email: {userState.token.userEmail}</p>
      </div>
      <div>
        <h3>Available rooms:</h3>
        <ul>
          {roomState.rooms.length >= 1 ? (
            roomState.rooms.map((room) => {
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
        </ul>
      </div>
    </>
  );
};

export default Join;
