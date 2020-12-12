import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

/*
 * @todo On token expire change navbar content
 * @body when user token expire navbar deos not change to let user login only when refresh
 */

const Navbar = (props) => {
  // console.log(props);
  const { userReducer } = props;
  const { isLoggedIn, user } = userReducer;

  return (
    <nav>
      <ul>
        {isLoggedIn && (
          <li>
            <p>Welcome {user.userName}</p>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* when user logged in these links are available */}
        {isLoggedIn && (
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
        {!isLoggedIn && (
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

const mapStateToProps = (state) => state;

export default compose(withRouter, connect(mapStateToProps))(Navbar);
