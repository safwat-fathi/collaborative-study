import { roomConstants } from "../constants/room.constants";

// user initial state
const roomInitialState = {
  loading: false,
  adminID: "",
  currentRoom: "",
  // isUserTokenExpired: !userToken,
  // user: userToken ? jwt_decode(localStorage.getItem("userToken")) : {},
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
    default:
      return state;
  }
};
