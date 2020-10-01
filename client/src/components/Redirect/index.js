import React from "react";

// components
// import WithAuth from "../HOCs/WithAuth";
import Login from "./Login";
import Register from "./Register";

const index = () => {
  return (
    <>
      <h1>Please login or register to proceed</h1>
      <Login />
      <Register />
    </>
  );
};

export default index;
