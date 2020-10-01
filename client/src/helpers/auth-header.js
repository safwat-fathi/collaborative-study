export const authHeader = () => {
  let localToken = localStorage.getItem("userToken"); // get stored token from localStorage

  // check if token exists
  if (localToken) {
    return { Authorization: `Bearer ${localToken}` };
  } else {
    return {};
  }
};
