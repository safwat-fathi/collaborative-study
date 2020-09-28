import React, { useEffect, useState } from "react";
// import axios from "axios";
import { api } from "../../helpers";
import { useFetch } from "../../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackMsg, setFeedBackMsg] = useState("");

  // custom hook to post login form data
  const [response, callAPI] = useFetch({
    api,
    url: "users/login",
    method: "post",
    paylaod: { email, password },
    headers: {
      "Content-type": "application/json",
    },
  });

  const { data, error } = response;

  useEffect(() => {
    if (error) {
      setFeedBackMsg("Sorry, error occurred!");
    }

    if (data !== null) {
      let token = data.token;
      localStorage.setItem("userToken", token);
    }
  }, [data, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setFeedBackMsg("Login failed, Please Check your Email or password");
      return;
    }

    callAPI();
  };

  return (
    <>
      <div className="login-profile">
        <h3 className="text-center mt-2 login-title">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput">email</label>
            <input
              autoComplete="on"
              className="form-control"
              id="emailInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">password</label>
            <input
              autoComplete="on"
              className="form-control"
              id="passwordInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        {feedBackMsg && <div>{feedBackMsg}</div>}
      </div>
    </>
  );
};

export default Login;
