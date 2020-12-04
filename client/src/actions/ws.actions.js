import { websocketConstants } from "../constants/ws.constants";
import { initWS, closeWS } from "../services/ws.services";

/*
 * @todo Create websocket actions
 * @body create actions to interact with websocket connection (send, close, onopen, onmessage)
 */

// -----------------------
// initiate websocket client
// -----------------------
const initWebSocketSuccess = (wsClient) => {
  return {
    type: websocketConstants.CONNECT_SUCCESS,
    payload: wsClient,
  };
};

const initWebSocketFail = (err) => {
  return {
    type: websocketConstants.CONNECT_FAILURE,
    payload: err,
  };
};

export const initWebSocketRequest = () => {
  return (dispatch) => {
    // return response from get request to available rooms in DB
    const wsClient = initWS();

    // ws intiated successfully
    if (wsClient) {
      // dispatch initWebSocketSuccess function
      dispatch(initWebSocketSuccess(wsClient));
    } else {
      // ws intiation failed
      dispatch(initWebSocketFail("Failed to connect to websocket server."));
    }
  };
};
// -----------------------
// close websocket client
// -----------------------

const closeWebSocketSuccess = () => {
  return {
    type: websocketConstants.DISCONNECT_SUCCESS,
    payload: "websocket client closed successfully",
  };
};

const closeWebSocketFail = (err) => {
  return {
    type: websocketConstants.DISCONNECT_FAILURE,
    payload: err,
  };
};

export const closeWebSocket = () => {
  console.log("from close ws actions");
  return (dispatch) => {
    try {
      closeWS();
      // ws closed successfully
      dispatch(closeWebSocketSuccess());
    } catch (err) {
      dispatch(closeWebSocketFail(err));
    }
  };
};
