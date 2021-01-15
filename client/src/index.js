import React from "react";
import ReactDOM from "react-dom";
// react router
import { BrowserRouter as Router } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./store";
// components
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
