import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// utils
import PrivateRoute from "../HOCs/PrivateRoute";
// components
import Navbar from "../Navbar";
import Home from "../Home";
import Rooms from "../Rooms";
import NotFound from "../NotFound";
import Login from "../Login";
import Logout from "../Logout";
import Register from "../Register";
// resources
// import splashimage from "./splash.jpeg";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/rooms" component={Rooms} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
