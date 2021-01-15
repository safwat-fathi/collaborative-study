import React from "react";
// redux
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <h1>Collaborative Study Platform</h1>
      <p>Wlecome {user.token.userName}</p>
    </>
  );
};

export default Home;
