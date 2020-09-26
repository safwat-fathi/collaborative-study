import React, { useEffect, useState } from "react";
// import axios from "axios";
import { api } from "../../helpers";
import { useFetch } from "../../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackMsg, setFeedBackMsg] = useState("");

  const { response, loading, error } = useFetch({
    api,
    method: "post",
    url: "/users/login",
    data: { email: "doby@test.com", password: "123" },
  });

  useEffect(() => {
    console.log("awdawawd");
    console.log(email);
    console.log(password);
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "" || error) {
      setFeedBackMsg("Login failed, Please Check your Email or password");
      return;
    }

    if (response !== null) {
      console.log("loading", loading);
      console.log("response", response);
      let token = response.token;

      localStorage.setItem("userToken", token);
    }
    // axios
    //   .post("http://localhost:4000/users/login", { email, password })
    //   .then((res) => {
    //     let token = res.data.token;

    //     localStorage.setItem("userToken", token);
    //     // setIsLoggedIn(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setFeedBackMsg("Login failed, Please Check your Email or password");
    //   });
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
