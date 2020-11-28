import React, { useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  const { loginReducer } = props;
  const { isLoggedIn, user } = loginReducer;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <h1>Collaborative Study Platform</h1>
      <p>Wlecome {user.userName}</p>
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
