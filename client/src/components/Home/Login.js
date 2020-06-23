import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { UserAuth, IsUserTokenExpired } from "../../context/UserContext";

const Login = () => {
  const { userAuth, setUserAuth } = useContext(UserAuth);
  const { isUserTokenExpired, setIsUserTokenExpired } = useContext(
    IsUserTokenExpired
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setFeedbackMsg("Please Check your Email or password");
      return;
    }

    try {
      axios
        .post("http://localhost:4000/users/login", { email, password })
        .then((res) => {
          let token = res.data.token;

          localStorage.setItem("userToken", token);
          setUserAuth(true);
        })
        .catch((err) => {
          console.log(err);
          setFeedbackMsg("Login failed, Please Check your Email or password");
        });
    } catch (err) {
      console.log("error in join", err);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div>
          <input
            type="password"
            autoComplete="on"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <div>{feedbackMsg}</div>
    </div>
  );
};

export default Login;
