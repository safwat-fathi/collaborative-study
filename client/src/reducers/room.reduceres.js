import { roomConstants } from "../constants/room.constants";

// user initial state
const roomInitialState = {
  // loading: false,
  // isLoggedIn: !!localStorage.getItem("userToken") && !!userToken,
  // isUserTokenExpired: !userToken,
  // user: userToken ? jwt_decode(localStorage.getItem("userToken")) : {},
  // error: null,
  rooms: [],
};

export const roomReducer = (state = roomInitialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
