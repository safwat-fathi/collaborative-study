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

export const closeWebSocket = (wsClient) => {
  return (dispatch) => {
    console.log("from close ws actions");
    try {
      console.log(wsClient);
      closeWS(wsClient);
      // ws closed successfully
      dispatch(closeWebSocketSuccess());
    } catch (err) {
      dispatch(closeWebSocketFail(err));
    }
  };
};

// -----------------------
// send a message
// -----------------------
const sendMsgRequest = () => {
  return {
    type: websocketConstants.SEND_REQUEST,
  };
};

const sendMsgSuccess = () => {
  return {
    type: websocketConstants.SEND_SUCCESS,
  };
};

const sendMsgFail = (err) => {
  return {
    type: websocketConstants.SEND_FAILURE,
    payload: err,
  };
};

export const sendMsg = (type, room, payload) => {
  console.log("from ws send message");

  return (dispatch) => {
    dispatch(sendMsgRequest());
    try {
      // send(type, room, payload);
      // ws message sent successfully
      dispatch(sendMsgSuccess());
    } catch (err) {
      // ws send message failed
      dispatch(sendMsgFail(err));
    }
  };
};
