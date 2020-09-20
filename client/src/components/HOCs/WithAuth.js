import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// importing components
import Login from "../Home/Login";
import Register from "../Home/Register";

import { UserContext } from "../../context";

const LoginRedirect = () => {
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
  return function AuthComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserTokenExpired, setIsUserTokenExpired] = useState(true);

    const userCTX = {
      isLoggedIn,
      setIsLoggedIn,
      isUserTokenExpired,
      setIsUserTokenExpired,
    };

    useEffect(() => {
      const localToken = localStorage.getItem("userToken");

      console.log("in with auth");

      if (localToken == null) {
        setIsUserTokenExpired(true);
        setIsLoggedIn(false);
      } else {
        const decodedToken = jwt_decode(localToken);

        // time now (without seconds & milliseconds)
        let now = +Date.now().toString().slice(0, -3);

        if (now > decodedToken.exp) {
          setIsUserTokenExpired(true);
          setIsLoggedIn(false);
        } else {
          setIsUserTokenExpired(false);
          setIsLoggedIn(true);
        }
      }
    }, []);

    console.log(isLoggedIn);

    return (
      <>
        {isLoggedIn && !isUserTokenExpired ? (
          <UserContext.Provider value={userCTX}>
            <Component {...props} />
          </UserContext.Provider>
        ) : (
          <LoginRedirect />
        )}
      </>
    );
  };
};

// };

export default WithAuth;
