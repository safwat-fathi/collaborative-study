import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// helpers
import { getUserToken } from "../../helpers/get-user-token";

const PrivateRoute = (props) => {
  let userToken = getUserToken();

  if (userToken === null) {
    return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
