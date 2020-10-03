import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
// import WithAuth from "../HOCs/WithAuth";
import Login from "../Login";
import Register from "../Register";

const index = () => {
  console.log("adwdawd");
  return (
    <>
      <h1>Please login or register to proceed</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </>
  );
};

export default index;
