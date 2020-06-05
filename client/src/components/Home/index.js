import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";

const Home = () => {
  return (
    <>
      <Login />
      <Register />
    </>
  );
};

export default Home;

/* 
NOTES:
- this will have switch routes (before user register/login and after that he can join or create new room). 
- from here user can join or create new room.
*/
