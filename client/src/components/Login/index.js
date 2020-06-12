import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket("ws://127.0.0.1:8080");

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/room");

    if (email === "" || password === "") {
      setFeedbackMsg("Please Check you Email or password");
      return;
    }

    try {
      axios
        .post("http://localhost:4000/users/login", { email, password })
        .then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <div>{feedbackMsg}</div>
    </div>
  );
};

export default withRouter(Login);
