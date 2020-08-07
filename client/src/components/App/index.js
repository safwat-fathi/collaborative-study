import React from "react";

import Home from "../Home";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Home />
        </div>
      </div>
    </>
  );
};

export default App;
/*
++ To-Do:
----------
- we must check user auth token if it is valid we change user context value of (userAuth) to true and then render Create/Join room component if auth token is not valid we render Login component.
- after checking user token is valid we store it to locale storage and check on it every time user connect. 
*/
