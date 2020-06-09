import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ---------------------
import Home from "../Home";
import Room from "../Room";
// ---------------------

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" render={Home} />
            <Route path="/room" render={Room} />
          </Switch>
        </Router>
      </>
    );
  }
}
