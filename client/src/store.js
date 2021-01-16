import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import roomReducer from "./roomSlice";
import wsReducer from "./wsSlice";
import webSocketMiddleware from "./wsMiddleware";
export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    websocket: wsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});
