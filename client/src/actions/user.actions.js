import jwt_decode from "jwt-decode";
import { userConstants } from "../constants/user.constants";
import { userLogin } from "../services/user.services";
import { getUserToken } from "../helpers/get-user-token";

// -----------------------
// user loging in actions
// -----------------------
export const userLoginRequest = (email, password) => {
  return async (dispatch) => {
    // return response from post request given (email & password) to the server
    const data = await userLogin(email, password);

    // login succeeded
    if (data) {
      // store token from response in localStorage
      localStorage.setItem("userToken", data.token);
      // decode token from response
      let decodedToken = jwt_decode(data.token);
      // dispatch userLoginSuccess function
      dispatch(userLoginSuccess(decodedToken));
    } else {
      // login failed
      dispatch(userLoginFail("Authentication failed"));
    }
  };
};

const userLoginSuccess = (user) => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: user,
  };
};

const userLoginFail = (err) => {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: err,
  };
};

// -----------------------
// user logout actions
// -----------------------
const userLogoutRequest = () => {
  return {
    type: userConstants.LOGOUT_REQUEST,
  };
};

const userLogoutSuccess = (user) => {
  return {
    type: userConstants.LOGOUT_SUCCESS,
    payload: user,
  };
};

const userLogoutFail = (err) => {
  return {
    type: userConstants.LOGOUT_FAILURE,
    payload: err,
  };
};

export const userLogout = () => {
  const user = getUserToken();

  return (dispatch) => {
    dispatch(userLogoutRequest());
    // if no user found in local storage
    if (!user) return dispatch(userLogoutSuccess({}));
    dispatch(userLogoutFail("user is not found"));
  };
};
// -----------------------
// user register actions
// -----------------------
export const userRegisterRequest = () => {};
