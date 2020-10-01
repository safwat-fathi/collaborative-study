import React from "react";
import ReactDOM from "react-dom";
// react router
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { loginReducer } from "./reducers/user.reduceres";
import thunk from "redux-thunk";

// components
import App from "./components/App";

const store = createStore(loginReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
