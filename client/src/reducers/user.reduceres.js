import { userConstants } from "../constants/user.constants";
import jwt_decode from "jwt-decode";
import { getUserToken } from "../helpers/get-user-token";

const userToken = getUserToken();
// user initial state
const userInitialState = {
  loading: false,
  isLoggedIn: !!localStorage.getItem("userToken") && !!userToken,
  isUserTokenExpired: !userToken,
  user: userToken ? jwt_decode(localStorage.getItem("userToken")) : {},
  error: null,
};

export const loginReducer = (state = userInitialState, action) => {
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
