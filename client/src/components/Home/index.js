import React, { useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  const { loginReducer } = props;
  const { isLoggedIn } = loginReducer;

  return (
    <>
      <h1>Collaborative Study Platform</h1>
      <p>
        Collaborative Study Platform is Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Libero nam reiciendis voluptatem sed dolor
        praesentium.
      </p>
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
