import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import webSocketMiddleware from "./wsMiddleware";
export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});
