import { w3cwebsocket as W3CWebSocket } from "websocket";

// initiate websocket client
export const initWS = () => {
  try {
    const wsClient = new W3CWebSocket("ws://127.0.0.1:8080");

    return wsClient;
  } catch (err) {
    console.log(err);
    return null;
  }
};
