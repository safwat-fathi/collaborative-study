import React, { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import "./join.css";

// import { RoomContext, UserContext } from "../../context";

const Join = () => {
  // filter rooms while searching
  // const [filterRoom, setFilterRoom] = useState([]);
  // const [inputChar, setInputChar] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/rooms")
      .then((res) => {
        let data = res.data;

        setRooms(data.rooms);
        setFilterRoom(data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });

    let localToken = localStorage.getItem("userToken");
    if (localToken !== null) {
      let decodedToken = jwt_decode(localToken);
      setUserID(decodedToken.userID);
      if (userName == "") {
        setUserName(decodedToken.userName);
      } else if (decodedToken.userName !== userName) {
        setUserName(userName);
      }
      setUserEmail(decodedToken.userEmail);
    }
  }, []);

  useEffect(() => {
    // webSocketClient.onopen = () => {
    //   webSocketClient.send(
    //     JSON.stringify({
    //       type: "rooms",
    //       payload: rooms,
    //     })
    //   );
    // };
  });

  useEffect(() => {
    const newList =
      rooms &&
      rooms.filter((d) => inputChar === "" || d.name.includes(inputChar));

    setFilterRoom(newList);
  }, [inputChar]);

  const onChangeHandlerfilter = (e) => {
    setInputChar(e.target.value);
  };

  return <>Join Room</>;
};

export default Join;
