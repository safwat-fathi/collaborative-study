import { roomConstants } from "../constants/room.constants";
import { getCurrentRoom } from "../helpers/get-current-room";
// user initial state
const roomInitialState = {
  loading: false,
  isAdmin: false,
  // get current room from local storage as default
  currentRoom: getCurrentRoom(),
  error: null,
  rooms: [],
};

export const roomReducer = (state = roomInitialState, action) => {
  switch (action.type) {
    // get rooms
    case roomConstants.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomConstants.GET_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
      };
    case roomConstants.GET_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // set current room admin
    case roomConstants.SET_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomConstants.SET_ADMIN_SUCCESS:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case roomConstants.SET_ADMIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // set current room
    case roomConstants.SET_CURRENT_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomConstants.SET_CURRENT_ROOM_SUCCESS:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case roomConstants.SET_CURRENT_ROOM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
