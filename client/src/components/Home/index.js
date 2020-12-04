import React, { useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  const { userReducer } = props;
  const { isLoggedIn, user } = userReducer;

  return (
    <>
      <h1>Collaborative Study Platform</h1>
      <p>Wlecome {user.userName}</p>
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
