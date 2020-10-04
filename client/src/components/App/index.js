import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
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
import Login from "../Login";
import Register from "../Register";
// import { login } from "../../services/user.services";
// import { getUserToken } from "../../helpers/get-user-token";
// resources
// import splashimage from "./splash.jpeg";
import "./App.css";

const App = (props) => {
  console.log(props);
  const { isLoggedIn } = props;
  // login("doby@test.com", "123");
  // console.log(getUserToken());

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
          )}
          <li>
            <Link to="/login">Sign in</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/rooms" component={Rooms} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => state;

export default compose(withRouter, connect(mapStateToProps))(App);
