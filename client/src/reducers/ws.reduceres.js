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

  switch (action.type) {
    // connect action types
    case CONNECT_REQUEST:
      return {
        ...state,
        feedBackMsg: "Connecting to WS...",
        loading: true,
      };
    case CONNECT_SUCCESS:
      return {
        ...state,
        feedBackMsg: "Connected to WS successfully",
        websocketClient: action.payload,
      };
    case CONNECT_FAILURE:
      return {
        ...state,
        feedBackMsg: "Connecting to WS failed",
        error: action.payload,
      };
    // close action types
    case DISCONNECT_SUCCESS:
      return {
        ...state,
        feedBackMsg: action.payload,
      };
    case DISCONNECT_FAILURE:
      return {
        ...state,
        feedBackMsg: action.payload,
        err: action.payload,
      };
    // send message action types
    case SEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_FAILURE:
      return {
        ...state,
        feedBackMsg: action.payload,
        err: action.payload,
      };
    case SEND_SUCCESS:
      return {
        ...state,
        feedBackMsg: "Message sent successfully",
      };

    default:
      return state;
  }
};
