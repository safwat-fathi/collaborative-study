import jwt_decode from "jwt-decode";
import { userConstants } from "../constants/user.constants";
import { userLogin } from "../services/user.services";

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

export const userLoginSuccess = (user) => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: user,
  };
};

export const userLoginFail = (err) => {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: err,
  };
};

// -----------------------
// user register actions
// -----------------------
export const userRegisterRequest = () => {};
