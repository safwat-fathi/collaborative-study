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

    return res.data;
    // api
    //   .post(
    //     "users/login",
    //     { email, password },
    //     {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   });
  } catch (err) {
    console.log(err);
    return null;
  }
};
