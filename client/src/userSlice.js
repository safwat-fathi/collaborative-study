// create slice helper from redux toolkit
import { createSlice } from "@reduxjs/toolkit";
// jwt decoder
import jwt_decode from "jwt-decode";
// user token helper
import { getUserToken } from "./helpers/get-user-token";
// user login helper
import { userLogin } from "./services/user.services";

// get user token
const userToken = getUserToken();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isLoggedIn: !!localStorage.getItem("userToken") && !!userToken,
    isUserTokenExpired: !userToken,
    token: userToken ? jwt_decode(localStorage.getItem("userToken")) : {},
    feedBackMsg: "",
    error: null,
  },
  reducers: {
    // login request
    loginRequest: (state, action) => {
      state.loading = action.payload;
    },
    // logged in successfully
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    // login failed
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    // // logout request
    // logoutRequest: (state) => {
    //   state.loading = true;
    // },
    // // logged out successfully
    // logoutSuccess: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = action.payload;
    // },
    // // logout failed
    // logoutFailure: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

// synchronous actions
export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;

// asynchronous actions
export const login = (email, password) => async (dispatch) => {
  // set loading to true
  dispatch(loginRequest(true));

  // return response from post request given (email & password) to the server
  const data = await userLogin(email, password);

  // login succeeded
  if (data) {
    // store token from response in localStorage
    localStorage.setItem("userToken", data.token);
    // decode token from response
    let decodedToken = jwt_decode(data.token);
    // dispatch LoginSuccess function
    dispatch(loginSuccess(decodedToken));
  } else {
    // login failed
    dispatch(loginFailure("Authentication failed"));
  }
  // set loading to false
  dispatch(loginRequest(false));
};

// select user state
export const selectUser = (state) => state.user.token;

export default userSlice.reducer;
