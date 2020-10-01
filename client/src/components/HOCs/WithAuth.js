import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

import { UserContext, useUserContext } from "../../context";

import Redirect from "../Redirect";

const WithAuth = (Component) => {
  return function AuthComponent(props) {
    const {
      isLoggedIn,
      isUserTokenExpired,
      setIsLoggedIn,
      setIsUserTokenExpired,
    } = useUserContext();

    useEffect(() => {
      const localToken = localStorage.getItem("userToken");

      // console.log("from withAuth HOC", localToken);

      if (localToken === null) {
        setIsUserTokenExpired(true);
        setIsLoggedIn(false);
      } else {
        const decodedToken = jwt_decode(localToken);

        // time now (without seconds & milliseconds)
        let now = +Date.now().toString().slice(0, -3);

        if (now > decodedToken.exp) {
          console.log("token expired");
          setIsUserTokenExpired(true);
          setIsLoggedIn(false);
        } else {
          console.log("token valid");
          setIsUserTokenExpired(false);
          setIsLoggedIn(true);
        }
      }
    }, [isLoggedIn, isUserTokenExpired]);

    return (
      <UserContext.Consumer>
        {(state) =>
          isLoggedIn && !isUserTokenExpired ? (
            <Component {...props} context={state} />
          ) : (
            <Redirect />
          )
        }
      </UserContext.Consumer>
    );
  };
};

// };

export default WithAuth;
