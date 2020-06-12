import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import CreateAndJoin from "../CreateAndJoinRoom";

const Home = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => <Redirect to="/login" />} />
  );
  return (
    <div class="container">
      <div class="row">
        <BrowserRouter>

          <PrivateRoute path="/" exact />
  
          <Switch>
            <Route
              path="/login"
              exact
              component={ Login }
            />
            <Route
              path="/register"
              exact
              component={ Register }
            />
            <Route
              path="/createAndJoinRoom"
              exact
              component={ CreateAndJoin }
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Home;

/* 
NOTES:
- this will have switch routes (before user register/login and after that he can join or create new room). 
- from here user can join or create new room.
*/
