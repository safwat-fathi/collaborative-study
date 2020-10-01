import jwt_decode from "jwt-decode";

export const validateUserToken = () => {
  let localToken = localStorage.getItem("userToken");

  if (localToken) {
    let decodedToken = jwt_decode(localToken); // decode stored token

    // time now (without seconds & milliseconds)
    let now = +Date.now().toString().slice(0, -3);
    // check if token expired
    if (now > decodedToken.exp) {
      console.log("token expired");
      return false;
    } else {
      console.log("token valid");
      return decodedToken;
    }
  }
};
