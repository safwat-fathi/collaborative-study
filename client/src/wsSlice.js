import { createSlice } from "@reduxjs/toolkit";

export const wsSlice = createSlice({
  name: "websocket",
  initialState: {
    messageSent: {},
    messageReceived: {},
    loading: false,
    connected: false,
    error: "",
  },
  reducers: {
    connect: (state, action) => {
      state.loading = true;
    },
    connected: (state, action) => {
      state.loading = false;
      state.connected = action.payload;
    },
    disconnect: (state, action) => {
      state.loading = true;
    },
    disconnected: (state, action) => {
      state.loading = false;
      state.connected = action.payload;
    },
    send: (state, action) => {
      state.messageSent = action.payload;
    },
    newMessage: (state, action) => {
      state.messageReceived = action.payload;
    },
  },
});

// synchronous actions
export const {
  connect,
  connected,
  disconnect,
  disconnected,
  send,
  newMessage,
} = wsSlice.actions;

export const selectWebSocketState = (state) => state.websocket.connected;
export const selectWebSocketMessageSent = (state) =>
  state.websocket.messageSent;
export const selectWebSocketMessageReceived = (state) =>
  state.websocket.messageReceived;

export default wsSlice.reducer;
