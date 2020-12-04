import { roomConstants } from "../constants/room.constants";
import { getRooms } from "../services/room.services";

// -----------------------
// GET ROOMS
// -----------------------
export const getRoomsRequest = () => {
  return async (dispatch) => {
    // return response from get request to available rooms in DB
    const data = await getRooms();

    // get rooms succeeded
    if (data) {
      // dispatch getRoomsSuccess function
      dispatch(getRoomsSuccess(data.data));
    } else {
      // get rooms failed
      dispatch(
        getRoomsFail("Failed to get rooms or there is no rooms avaiable.")
      );
    }
  };
};

const getRoomsSuccess = (rooms) => {
  return {
    type: roomConstants.GET_SUCCESS,
    payload: rooms,
  };
};

const getRoomsFail = (err) => {
  return {
    type: roomConstants.GET_FAILURE,
    payload: err,
  };
};

// -----------------------
// SET CURRNET ROOM
// -----------------------
const setCurrentRoomRequest = () => {
  return {
    type: roomConstants.SET_CURRENT_ROOM_REQUEST,
  };
};

const setCurrentRoomSuccess = (room) => {
  return {
    type: roomConstants.SET_CURRENT_ROOM_SUCCESS,
    payload: room,
  };
};

const setCurrentRoomFail = (err) => {
  return {
    type: roomConstants.SET_CURRENT_ROOM_FAILURE,
    payload: err,
  };
};

export const setCurrentRoom = (rooms = [], roomId = "") => {
  let currentRoom = rooms.find((room) => room._id === roomId);

  return (dispatch) => {
    // set room succeeded
    if (currentRoom) {
      // storing current room to local storage
      localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
      // dispatch setCurrentRoomSuccess function
      dispatch(setCurrentRoomSuccess(currentRoom));
    } else {
      // get rooms failed
      dispatch(setCurrentRoomFail("This room does not exist"));
    }
  };
};
