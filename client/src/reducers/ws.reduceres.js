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
    default:
      return state;
  }
};
