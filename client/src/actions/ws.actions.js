import { websocketConstants } from "../constants/ws.constants";
import { initWS } from "../services/ws.services";

/*
 * @todo Create websocket actions
 * @body create actions to interact with websocket connection (send, close, onopen, onmessage)
 */

// -----------------------
// initiate websocket client
// -----------------------
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
