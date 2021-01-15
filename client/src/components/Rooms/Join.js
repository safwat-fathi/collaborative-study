import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./join.css";
import { getRoomsRequest } from "../../actions/room.actions";
import { setCurrentRoom } from "../../actions/room.actions";

import Room from "./Room";

const Join = (props) => {
  // console.log(props);

  const { userReducer, roomReducer, getRoomsRequest, setCurrentRoom } = props;
  const { user } = userReducer;
  const { loading, adminID, currentRoom, error, rooms } = roomReducer;

  useEffect(() => {
    getRoomsRequest();
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
    setCurrentRoom(rooms, roomId);
  };

  return (
    <>
      <div>
        <h3>You profile:</h3>
        <p>logged in as: {user.userName}</p>
        <p>your email: {user.userEmail}</p>
      </div>
      <div>
        <h3>Available rooms:</h3>
        <ul>
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
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomsRequest: () => dispatch(getRoomsRequest()),
    setCurrentRoom: (rooms, roomId) => dispatch(setCurrentRoom(rooms, roomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
