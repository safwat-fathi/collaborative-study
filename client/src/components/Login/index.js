import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket("ws://127.0.0.1:8000");

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    if (name === "" || password === "") {
      setFeedbackMsg("Please Check you name or password");
      e.preventDefault();
      return;
    }
    console.log("submitted");

    // sending name & room data by websocket
    // client.send(
    //   JSON.stringify({
    //     type: "join",
    //     room: room,
    //     message: {
    //       userName: name,
    //       roomName: room,
    //     },
    //   })
    // );
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Link onClick={handleSubmit} to={`/?room=${room}`}> */}
        <input type="submit" value="Login" />
      </form>
      {feedbackMsg ? <div>{feedbackMsg}</div> : ""}
      {/* </Link> */}
    </div>
  );
};

export default Login;

/* 
NOTES: 
- change Link param to home page
*/
