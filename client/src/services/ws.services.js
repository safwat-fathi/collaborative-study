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
    console.log(wsClient);
    wsClient.close();

    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// send a message by a websocket client
export const send = (type = "", room = "", payload = {}) => {
  // message types = ["closing", ]
  try {
    wsClient.send(
      JSON.stringify({
        type,
        room,
        payload,
      })
    );

    console.log("ws message sent");
    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};
