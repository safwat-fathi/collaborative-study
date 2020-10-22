import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

// const RoomName = () => {
//   let { name } = useParams();
//   return (
//     <h3 className="heading col-7 text-center text-capitalize">
//       {" "}
//       Room : {name}{" "}
//     </h3>
//   );
// };

const Navbar = (props) => {
  console.log(props);
  const { isLoggedIn } = props;

  return (
    <nav>
      <ul>
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
