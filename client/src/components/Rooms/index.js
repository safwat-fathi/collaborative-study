import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Join from "../Join";
import Room from "./Room";

const Rooms = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/rooms" component={Join} />
        <Route path="/rooms/:roomID" component={Room} />
      </Switch>
    </Router>
  );
};

export default Rooms;
