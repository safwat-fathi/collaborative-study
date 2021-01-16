// create slice helper from redux toolkit
import { createSlice } from "@reduxjs/toolkit";
// get rooms helper
import { getRooms, getCurrentRoom } from "./services/room.services";

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
    // getting rooms
    gettingRooms: (state, action) => {
      const { payload } = action;

      state.loading = payload;
    },
    // get rooms successfully
    getRoomsSuccess: (state, action) => {
      const { payload } = action;

      state.rooms = payload;
      state.loading = false;
    },
    // get rooms failed
    getRoomsFailure: (state, action) => {
      const { payload } = action;

      state.error = payload;
      state.loading = false;
    },
    // set current room
    settingCurrentRoom: (state, action) => {
      const { payload } = action;

      state.loading = true;
    },
    // setting current room successfully
    setCurrentRoomSuccess: (state, action) => {
      const { payload } = action;

      state.currentRoom = payload;
      state.loading = false;
    },
    // set current room failed
    setCurrentRoomFailure: (state, action) => {
      const { payload } = action;

      state.error = payload;
      state.loading = false;
    },
  },
});

// synchronous actions
// --------------------
export const {
  gettingRooms,
  getRoomsSuccess,
  getRoomsFailure,
  settingCurrentRoom,
  setCurrentRoomSuccess,
  setCurrentRoomFailure,
} = roomSlice.actions;

// asynchronous actions
// --------------------

//get rooms request
export const getRoomsRequest = () => async (dispatch) => {
  // set loading to true
  dispatch(gettingRooms(true));

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

export const setCurrentRoom = (rooms = [], roomID = "") => {
  let currentRoom = rooms.find((room) => room._id === roomID);

  return (dispatch) => {
    // set room succeeded
    if (currentRoom) {
      // storing current room to local storage
      localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
      // dispatch setCurrentRoomSuccess action
      dispatch(setCurrentRoomSuccess(currentRoom));
    } else {
      // get rooms failed
      dispatch(setCurrentRoomFailure("This room does not exist"));
    }
  };
};

// select user state
export const selectRoom = (state) => state.room;

export default roomSlice.reducer;
