import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
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
      console.log("err in join",err);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 col mt-5">
      <h3 className="text-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="emailInput">email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
          />
        </div>
        <div className="form-group">
          <label for="passwordInput">password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
          />
        </div>
        <input className="btn btn-primary btn-lg btn-block" type="submit" value="Login" />
        <div className="form-group text-right mt-2">
          <NavLink to="register" exact>
             register
          </NavLink>  
        </div>
      </form>
      <div>{feedbackMsg}</div>
    </div>
  );
};

export default Login;
