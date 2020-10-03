import jwt_decode from "jwt-decode";
import { userConstants } from "../constants/user.constants";
import { login } from "../services/user.services";

import { createBrowserHistory } from "history";

export const userLoginRequest = (email, password, from) => {
  const history = createBrowserHistory();

  return async (dispatch) => {
    // return response from post request given (email & password) to the server
    const data = await login(email, password);

    // login succeeded
    if (data) {
      // store token from response in localStorage
      localStorage.setItem("userToken", data.token);
      // decode token from response
      let decodedToken = jwt_decode(data.token);
      // dispatch userLoginSuccess function
      dispatch(userLoginSuccess(decodedToken));

      // return user back to URL that redirected him to login
      history.push(from);
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
