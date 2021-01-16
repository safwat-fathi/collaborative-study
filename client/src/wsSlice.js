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
      const { payload } = action;

      state.loading = false;
      state.connected = payload;
    },
    disconnect: (state, action) => {
      state.loading = true;
    },
    disconnected: (state, action) => {
      const { payload } = action;

      state.loading = false;
      state.connected = payload;
    },
    send: (state, action) => {
      const { payload } = action;

      state.messageSent = payload;
    },
    newMessage: (state, action) => {
      const { payload } = action;

      state.messageReceived = payload;
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

export const selectWebSocket = (state) => state.websocket;

export default wsSlice.reducer;
