import React, { useEffect, useState } from "react";
// import axios from "axios";
import { api } from "../../helpers";
import { useFetch } from "../../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackMsg, setFeedBackMsg] = useState("");
  // custom hook to post/get data
  const [response, callAPI] = useFetch({
    api,
    url: "users/login",
    method: "post",
    paylaod: { email, password },
    headers: {
      "Content-type": "application/json",
    },
  });

  const { data, loading, error } = response;

  useEffect(() => {
    if (data === null) {
      console.log("response is null", data);
    }

    if (error) {
      setFeedBackMsg("Sorry, error occurred!", error);
    }

    if (!loading) {
      console.log("done", data);
      let token = data.token;
      localStorage.setItem("userToken", token);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setFeedBackMsg("Login failed, Please Check your Email or password");
      return;
    }

    callAPI();
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
