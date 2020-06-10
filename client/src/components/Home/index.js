import React from "react";

import Login from "../Login";
import Register from "../Register";
import CreateAndJoin from "../CreateAndJoinRoom";

const Home = () => {
  return (
    <>
      <CreateAndJoin />
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
