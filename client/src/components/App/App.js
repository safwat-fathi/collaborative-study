import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// ---------------------
import Join from "../Join";
import Room from "../Room";
// ---------------------

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Join}></Route>
        <Route path="/whiteboard" component={Room}></Route>
      </Router>
    );
  }
}
