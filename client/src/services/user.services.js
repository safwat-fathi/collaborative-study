import { api } from "../helpers/api";

// login user
export const userLogin = async (email, password) => {
  try {
    let res = await api.post(
      "users/login",
      { email, password },
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

// register user
export const userRegister = async (name, email, password, confirmPassword) => {
  try {
    let res = await api.post(
      "users/regitser",
      { name, email, password, confirmPassword },
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
