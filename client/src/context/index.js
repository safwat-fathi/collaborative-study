import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isUserTokenExpired: true,
  setIsUserTokenExpired: () => {},
});

export const RoomContext = createContext({
  // whiteboard state
  canvas: null,
  setCanvas: () => {},
  ctx: null,
  setCtx: () => {},
  drawing: false,
  setDrawing: () => {},
  erasing: false,
  setErasing: () => {},
  x: 0,
  setX: () => {},
  y: 0,
  setY: () => {},
  color: "",
  setColor: () => {},
  drawingDataFromWS: null,
  setDrawingDataFromWS: () => {},
  // chat state
  newMessage: "",
  setNewMessage: () => {},
  messages: [],
  setMessages: () => {},
  // join room state
  rooms: [],
  setRooms: () => {},
  currentRoom: "",
  setCurrentRoom: () => {},
  userID: "",
  setUserID: () => {},
  userName: "",
  setUserName: () => {},
  userEmail: "",
  setUserEmail: () => {},
  webSocketClient: null,
  setWebSocketClient: () => {},
});
