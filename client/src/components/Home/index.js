import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// importing components
import Login from "./Login";
import Register from "./Register";
import Rooms from "../Rooms";

import { UserContext } from "../../context";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserTokenExpired, setIsUserTokenExpired] = useState(true);

  const userCTX = {
    isLoggedIn,
    setIsLoggedIn,
    isUserTokenExpired,
    setIsUserTokenExpired,
  };

  useEffect(() => {
    let localToken = localStorage.getItem("userToken");

    if (localToken === null) {
      setIsUserTokenExpired(true);
      setIsLoggedIn(false);
      return;
    }

    let decodedToken = jwt_decode(localToken);

    // time now (without seconds & milliseconds)
    let now = +Date.now().toString().slice(0, -3);

    if (now > decodedToken.exp) {
      setIsUserTokenExpired(true);
      setIsLoggedIn(false);
    } else {
      setIsUserTokenExpired(false);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={userCTX}>
      <>
        {isLoggedIn ? (
          <>
            <h1>Welcome, create new room or join one</h1>
            <Rooms />
          </>
        ) : (
          <>
            <h1>Welcome, login or register new account</h1>
            <Login />
            <Register />
          </>
        )}
      </>
    </UserContext.Provider>
  );
};

export default Home;
