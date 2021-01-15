import { websocketConstants } from "../constants/ws.constants";
import { initWS, closeWS } from "../services/ws.services";

const {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT_REQUEST,
  DISCONNECT_SUCCESS,
  DISCONNECT_FAILURE,
  SEND_REQUEST,
  SEND_SUCCESS,
  SEND_FAILURE,
} = websocketConstants;

/*
 * @todo Create websocket actions
 * @body create actions to interact with websocket connection (send, close, onopen, onmessage)
 */

// -----------------------
// initiate websocket client
// -----------------------
const initWebSocketSuccess = (wsClient) => {
  return {
    type: CONNECT_SUCCESS,
    payload: wsClient,
  };
};

const initWebSocketFail = (err) => {
  return {
    type: CONNECT_FAILURE,
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
    type: DISCONNECT_SUCCESS,
    payload: "websocket client closed successfully",
  };
};

const closeWebSocketFail = (err) => {
  return {
    type: DISCONNECT_FAILURE,
    payload: err,
  };
};

export const closeWebSocket = () => {
  return (dispatch) => {
    console.log("from close ws actions");
    try {
      closeWS();
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
    type: SEND_REQUEST,
  };
};

const sendMsgSuccess = () => {
  return {
    type: SEND_SUCCESS,
  };
};

const sendMsgFail = (err) => {
  return {
    type: SEND_FAILURE,
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
