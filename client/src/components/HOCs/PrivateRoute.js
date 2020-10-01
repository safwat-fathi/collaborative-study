import React from "react";
import { Route, Redirect } from "react-router-dom";
// components
import Home from "../Home";
// helpers
import { getUserToken } from "../../helpers/get-user-token";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // get user token stored in localStorage
        let userToken = getUserToken();

        if (userToken === null) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

// };

export default PrivateRoute;
