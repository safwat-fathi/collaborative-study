import { api } from "../helpers/api";

// get rooms
export const getRooms = async () => {
  try {
    let res = await api.get("rooms");

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// create room
export const createRoom = async (name, adminID, desc) => {
  try {
    let res = await api.post(
      "rooms/create",
      { name, adminID, desc },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
