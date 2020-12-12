import { websocketConstants } from "../constants/ws.constants";

// user initial state
const websocketInitialState = {
  connected: false,
  loading: false,
  websocketClient: null,
  feedBackMsg: "",
  error: null,
};

export const wsReducer = (state = websocketInitialState, action) => {
  switch (action.type) {
    // connect action types
    case websocketConstants.CONNECT_REQUEST:
      return {
        ...state,
        feedBackMsg: "Connecting to WS...",
        loading: true,
      };
    case websocketConstants.CONNECT_SUCCESS:
      return {
        ...state,
        feedBackMsg: "Connected to WS successfully",
        websocketClient: action.payload,
      };
    case websocketConstants.CONNECT_FAILURE:
      return {
        ...state,
        feedBackMsg: "Connecting to WS failed",
        error: action.payload,
      };
    // close action types
    case websocketConstants.DISCONNECT_SUCCESS:
      return {
        ...state,
        feedBackMsg: action.payload,
      };
    case websocketConstants.DISCONNECT_FAILURE:
      return {
        ...state,
        feedBackMsg: action.payload,
        err: action.payload,
      };
    // send message action types
    case websocketConstants.SEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case websocketConstants.SEND_FAILURE:
      return {
        ...state,
        feedBackMsg: action.payload,
        err: action.payload,
      };
    case websocketConstants.SEND_SUCCESS:
      return {
        ...state,
        feedBackMsg: "Message sent successfully",
      };

    default:
      return state;
  }
};
