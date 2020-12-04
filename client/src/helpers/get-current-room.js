export const getCurrentRoom = () => {
  let currentRoom = localStorage.getItem("currentRoom");

  if (!currentRoom) {
    return null;
  }

  return JSON.parse(currentRoom);
};
