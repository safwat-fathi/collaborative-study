import React, { useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

// importing components
import Login from "../Home/Login";
import Register from "../Home/Register";

import { UserContext } from "../../context";

const LoginRedirect = () => {
  const [form, setForm] = useState(true);

  return (
    <>
      <h1 className="text-center">Please login first or register to proceed</h1>
      <div>
        <Login />
        <Register />
      </div>
    </>
  );
};

const WithAuth = (Component) => {
  return function AuthenticatedComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserTokenExpired, setIsUserTokenExpired] = useState(true);

    const userCTX = {
      isLoggedIn,
      setIsLoggedIn,
      isUserTokenExpired,
      setIsUserTokenExpired,
    };

    console.log(`from AuthenticatedComponent (isLoggedIn): ${isLoggedIn}`);
    console.log(
      `from AuthenticatedComponent (isUserTokenExpired): ${isUserTokenExpired}`
    );

    useEffect(() => {
      const localToken = localStorage.getItem("userToken");
      if (localToken == null) {
        setIsUserTokenExpired(true);
        setIsLoggedIn(false);
        return;
      } else {
        const decodedToken = jwt_decode(localToken);

        // time now (without seconds & milliseconds)
        let now = +Date.now().toString().slice(0, -3);

        if (now > decodedToken.exp) {
          console.log("in if stat. now > decodedToken.exp");
          setIsUserTokenExpired(true);
          setIsLoggedIn(false);
        } else {
          console.log("in if stat. is logged in");
          setIsUserTokenExpired(false);
          setIsLoggedIn(true);
        }
      }
    }, []);

    useEffect(() => {
      // console.log(isLoggedIn);
    });

    return (
      <>
        {isLoggedIn && !isUserTokenExpired ? (
          <UserContext.Provider value={userCTX}>
            <Component />
          </UserContext.Provider>
        ) : (
          <LoginRedirect />
        )}
      </>
    );
  };
};

export default WithAuth;
