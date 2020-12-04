import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// helpers
import { getUserToken } from "../../helpers/get-user-token";

const PrivateRoute = (props) => {
  let userToken = getUserToken();

  if (!userToken) {
    return (
      <Redirect to={{ pathname: "/guest", state: { from: props.location } }} />
    );
  }

  return <Route {...props} />;
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
