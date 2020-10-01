// The redux store helper calls createStore() to create the centralized redux state store for the entire application.
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
