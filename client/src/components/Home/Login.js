import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../../context";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { isUserTokenExpired, setIsUserTokenExpired } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setFeedbackMsg("Please Check your Email or password");
      return;
    }
    axios
      .post("http://localhost:4000/users/login", { email, password })
      .then((res) => {
        let token = res.data.token;

        localStorage.setItem("userToken", token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setFeedbackMsg("Login failed, Please Check your Email or password");
      });
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
