import React, { useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../userSlice";

/*
 * @todo Feed back message on login
 * @body notify user with a feed back message on login either it's success or failed
 */

const Login = () => {
  // app state
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login(email, password));
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      console.log(from);
      history.push(from);
    } else {
      return;
    }
  };

  console.log(user);

  return (
    <>
      <div className="login-profile">
        <h3 className="text-center mt-2 login-title">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput">email</label>
            <input
              autoComplete="on"
              className="form-control"
              id="emailInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">password</label>
            <input
              autoComplete="on"
              className="form-control"
              id="passwordInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        {/* {feedBackMsg && <div>{feedBackMsg}</div>} */}
      </div>
      <p>
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </p>
    </>
  );
};

export default Login;
