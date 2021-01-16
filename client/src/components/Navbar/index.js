import React from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// user slice
import { login, loginSuccess, loginFailure, selectUser } from "../../userSlice";

/*
 * @todo On token expire change navbar content
 * @body when user token expire navbar deos not change to let user login only when refresh
 */

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <nav>
      <ul>
        {user.isLoggedIn && (
          <li>
            <p>Welcome {user.token.userName}</p>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* when user logged in these links are available */}
        {user.isLoggedIn && (
          <>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
        {/* when user is not logged in these links are available */}
        {!user.isLoggedIn && (
          <>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
