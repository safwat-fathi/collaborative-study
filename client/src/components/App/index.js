import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// redux
import { connect } from "react-redux";
// utils
import PrivateRoute from "../HOCs/PrivateRoute";
// components
import Navbar from "../Navbar";
import Home from "../Home";
import Rooms from "../Rooms";
import NotFound from "../NotFound";
import Login from "../Login";
import Logout from "../Logout";
import Guest from "../Guest";
import Register from "../Register";
// resources
// import splashimage from "./splash.jpeg";

/*
 * @todo after log in still redirects to guest
 * @body after a successful log in user can still see a guest message on home
 */

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/rooms" component={Rooms} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route path="/guest" component={Guest} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
