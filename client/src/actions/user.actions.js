import { userConstants } from "../constants/user.constants";
import { login } from "../services/user.services";

export const userLoginRequest = (email, password) => {
  return (dispatch) => {
    // return response from post request given (email & password) to the server
    const data = login(email, password);

    // login succeeded
    if (data !== null) {
      // store token from response in localStorage
      localStorage.setItem("userToken", data.token);
      // decode token from response
      let decodedToken = jwt_decode(data.token);
      // dispatch userLoginSuccess function
      dispatch(userLoginSuccess(decodedToken));
    }

    // login failed
    dispatch(userLoginFail("Authentication went wrong"));
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
