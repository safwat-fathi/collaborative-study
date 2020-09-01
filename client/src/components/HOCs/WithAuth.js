import React, { useState, useContext } from "react";

// importing components
import Login from "../Home/Login";
import Register from "../Home/Register";

import { UserContext } from "../../context";

const LoginRedirect = () => {
  const [form, setForm] = useState(true);

  return (
    <div>
      <h1 className="text-center">Please login first or register to proceed</h1>
      <>
        <Login />
        <Register />
      </>
    </div>
  );
};

const WithAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const userCTX = useContext(UserContext);
    const { isLoggedIn, isUserTokenExpired } = userCTX;

    const [feedBackMsg, setFeedBackMsg] = useState("");
    console.log(`from AuthenticatedComponent (isLoggedIn): ${isLoggedIn}`);
    console.log(
      `from AuthenticatedComponent (isUserTokenExpired): ${isUserTokenExpired}`
    );

    return (
      <div>
        {isLoggedIn && !isUserTokenExpired ? (
          <Component {...props} />
        ) : (
          <LoginRedirect />
        )}
      </div>
    );
  };
};

export default WithAuth;
