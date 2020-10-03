import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  // get the last user path from location state or default to home page
  const { from } = location.state || { from: { path: "/" } };

  return (
    <div>
      <h1>Error 404, did not found that destination</h1>
      <Link to={{ pathname: `${from.path}` }}>Go back</Link>
    </div>
  );
};

export default NotFound;
