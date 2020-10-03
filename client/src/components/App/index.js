import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

// utils
import PrivateRoute from "../HOCs/PrivateRoute";
// components
import Home from "../Home";
import Rooms from "../Rooms";
import NotFound from "../NotFound";
// import { login } from "../../services/user.services";
// import { getUserToken } from "../../helpers/get-user-token";
// resources
// import splashimage from "./splash.jpeg";
import "./App.css";

const App = (props) => {
  // console.log(props);
  // login("doby@test.com", "123");
  // console.log(getUserToken());

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/rooms" component={Rooms} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => state;

export default compose(withRouter, connect(mapStateToProps))(App);
