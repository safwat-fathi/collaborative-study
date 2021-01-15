// create slice helper from redux toolkit
import { createSlice } from "@reduxjs/toolkit";
// get rooms helper
import { getRooms, getCurrentRoom } from "../services/room.services";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    loading: false,
    isAdmin: false,
    // get current room from local storage as default
    currentRoom: getCurrentRoom(),
    rooms: [],
    error: null,
  },
  reducers: {
    // get rooms request
    getRoomsRequest: (state, action) => {
      const { payload } = action;

      state.loading = payload;
    },
    // logged in successfully
    getRoomsSuccess: (state, action) => {
      const { payload } = action;

      state.rooms = payload;
      state.loading = false;
    },
    // login failed
    getRoomsFailure: (state, action) => {
      const { payload } = action;

      state.error = payload;
      state.loading = false;
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
export const {
  getRoomsRequest,
  getRoomsSuccess,
  getRoomsFailure,
} = roomSlice.actions;

// asynchronous actions
export const getRooms = async (dispatch) => {
  // set loading to true
  dispatch(getRoomsRequest(true));

  // return response from get request to available rooms in DB
  const data = await getRooms();

  // get rooms succeeded
  if (data) {
    // dispatch getRoomsSuccess function
    dispatch(getRoomsSuccess(data.data));
  } else {
    // get rooms failed
    dispatch(
      getRoomsFailure("Failed to get rooms or there is no rooms avaiable.")
    );
  }
};

// select user state
export const selectUser = (state) => state.user;

export default userSlice.reducer;
