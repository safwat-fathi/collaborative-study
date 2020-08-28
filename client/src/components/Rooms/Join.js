import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import "./join.css";

import { RoomContext, UserContext } from "../../context";
import Navbar from "../Navbar";

function Modal({ isVisible = false, title, onClose }) {
  const [name, setName] = useState("");
  const [adminID, setadminID] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  useEffect(() => {
    let localToken = localStorage.getItem("userToken");
    let decodedToken = jwt_decode(localToken);
    setadminID(decodedToken.userID);
  }, []);

  const CreateRoom = (e) => {
    e.preventDefault();
    let localToken = localStorage.getItem("userToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    };
    axios
      .post(
        "http://localhost:4000/rooms/create",
        {
          name,
          adminID,
          desc,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.message === "room created successfully") {
          console.log("res.data.message ", res.data.message);
          onClose();
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function keydownHandler({ key }) {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  }

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <form onSubmit={CreateRoom}>
              <div className="form-group">
                <label className="col-form-label" htmlFor="name">
                  room name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="please write Room name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label" htmlFor="descriptiont">
                  room descriptiont
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="please write desc"
                  id="descriptiont"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <input
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                value="create room"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const Join = () => {
  const [isModal, setModal] = useState(false);
  const {
    userName,
    userID,
    userEmail,
    setUserID,
    setUserName,
    setUserEmail,
    webSocketClient,
    rooms,
    setRooms,
    setCurrentRoom,
  } = useContext(RoomContext);

  const [filterRoom, setFilterRoom] = useState([]);
  const [inputChar, setInputChar] = useState("");

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
    let decodedToken = jwt_decode(localToken);
    setUserID(decodedToken.userID);
    setUserName(decodedToken.userName);
    setUserEmail(decodedToken.userEmail);
  }, []);

  useEffect(() => {
    webSocketClient.onopen = () => {
      webSocketClient.send(
        JSON.stringify({
          type: "rooms",
          payload: rooms,
        })
      );
    };
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

  return (
    <>
      <Navbar filter={onChangeHandlerfilter} model={setModal} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-3  offset-sm-1">
            <div className="card bg-light mt-3">
              <div className="card-header text-capitalize">your profile</div>
              <div className="card-body">
                <h4 className="card-title">name : {userName}</h4>
                <p className="card-text">email : {userEmail}</p>
              </div>
            </div>
          </div>
          <div className="col-6  offset-sm-1">
            {filterRoom.map((room) => {
              return (
                <div key={room._id} className="card bg-light mt-3">
                  <div className="card-header text-capitalize">public room</div>
                  <div className="card-body">
                    <h4 className="card-title text-capitalize">
                      room name : {room.name}
                    </h4>
                    {/* <h4 className="card-text">creator name: john</h4> */}
                    <p className="card-text text-capitalize">
                      room descriptiont: {room.desc}
                    </p>
                    {/* <p className="card-text">members : 5</p> */}
                    <p className="card-text">
                      <Link
                        onClick={() => setCurrentRoom(room._id)}
                        to={`/rooms/${room.name}`}
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-lg d-block mx-auto text-center text-capitalize"
                        >
                          join room
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isVisible={isModal}
        title="create room"
        onClose={() => setModal(false)}
      />
    </>
  );
};

export default Join;
