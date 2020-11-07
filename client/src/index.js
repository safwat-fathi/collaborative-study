import React from "react";
import ReactDOM from "react-dom";
// react router
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { loginReducer } from "./reducers/user.reduceres";
import { roomReducer } from "./reducers/room.reduceres";
import thunk from "redux-thunk";

// components
import App from "./components/App";

const rootReducer = combineReducers({
  loginReducer,
  roomReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
