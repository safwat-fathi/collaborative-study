import React, { useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  const { isLoggedIn, user } = props;

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <>
      <h1>Collaborative Study Platform</h1>
      <p>
        Collaborative Study Platform is Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Libero nam reiciendis voluptatem sed dolor
        praesentium.
      </p>
      {isLoggedIn && <p>Welcome user!</p>}
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
