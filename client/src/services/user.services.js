// import { useFetch } from "../../hooks";
import { api } from "../helpers/api";

export const login = async (email, password) => {
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
    console.log(res.data);
    return res.status === 200 ? res.data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
