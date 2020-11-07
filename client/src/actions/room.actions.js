import jwt_decode from "jwt-decode";
import { roomConstants } from "../constants/room.constants";
import { getRooms } from "../services/room.services";

// -----------------------
// user loging in actions
// -----------------------
export const getRoomsRequest = () => {
  return async (dispatch) => {
    // return response from get request to available rooms in DB
    const data = await getRooms();

    // get rooms succeeded
    if (data) {
      // dispatch getRoomsSuccess function
      dispatch(getRoomsSuccess(data));
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
