import React, { useState } from "react";
// import axios from "axios";

const Join = () => {
  const [roomName, setRoomName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName === "") {
      setFeedbackMsg("Please enter valid room name!");
      return;
    }

    // try {
    //   axios
    //     .post("http://localhost:8000/userLogin", { email, password })
    //     .then((res) => console.log(res));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div>
      <h3>Join a room</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />

        <input type="submit" value="Join" />
      </form>
      <div>{feedbackMsg}</div>
    </div>
  );
};

export default Join;
