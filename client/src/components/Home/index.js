import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// importing components
import Login from "./Login";
import Register from "./Register";
import JoinRoom from "../Room/Join";

import { UserAuth, isUserTokenExpired } from "../../context/UserContext";

const Home = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [isUserTokenExpired, setIsUserTokenExpired] = useState(true);

  const userContext = {
    userAuth,
    setUserAuth,
    isUserTokenExpired,
    setIsUserTokenExpired,
  };

  useEffect(() => {
    let localToken = localStorage.getItem("userToken");

    if (localToken === null) {
      setIsUserTokenExpired(true);
      setUserAuth(false);
      return;
    }

    let decodedToken = jwt_decode(localToken);
    console.log(decodedToken);

    // time now (without seconds & milliseconds)
    let now = +Date.now().toString().slice(0, -3);
    console.log(typeof now, typeof decodedToken.exp);

    if (now > decodedToken.exp) {
      console.log("token expired");
      setIsUserTokenExpired(true);
      setUserAuth(false);
    } else {
      console.log("token valid");
      setIsUserTokenExpired(false);
      setUserAuth(true);
    }
  }, []);

  return (
    <UserAuth.Provider value={userContext}>
      <>
        {userAuth ? (
          <>
            <h1>Welcome, create new room or join one</h1>
            <JoinRoom />
          </>
        ) : (
          <>
            <h1>Welcome, login or register new account</h1>
            <Login />
            <Register />
          </>
        )}
      </>
    </UserAuth.Provider>
  );
};

export default Home;
