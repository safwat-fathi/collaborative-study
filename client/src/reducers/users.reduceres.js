import { userConstants } from "../constants/user.constants";
import { api } from "../helpers/api";

// user initial state
const userInitialState = {
  loading: false,
  isLoggedIn: false,
  isUserTokenExpired: true,
  user: {},
  error: null,
};

const loginReducer = (state = userInitialState, action) => {
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
