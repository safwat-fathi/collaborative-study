import { w3cwebsocket as W3CWebSocket } from "websocket";

// declare ws client
const wsClient = new W3CWebSocket("ws://127.0.0.1:8080");

// initiate websocket client
export const initWS = () => {
  try {
    return wsClient;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/*
 *@todo Close websocket connection with reason
 *@body when closing websocket connection give
 */

// close websocket client
export const closeWS = () => {
  try {
    console.log("closing ws");
    wsClient.close();

    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};
