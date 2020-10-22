import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";
// redux actions
import { userLoginRequest } from "../../actions/user.actions";

const Login = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackMsg, setFeedBackMsg] = useState("");
  const { user, userLoginRequest, error } = props;
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      userLoginRequest(email, password);
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      history.push(from);
    } else {
      setFeedBackMsg("Login failed, Please Check your Email or password");
      return;
    }
  };

  useEffect(() => {
    if (error) {
      setFeedBackMsg(error);
    }
  }, [user, error]);

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
        {feedBackMsg && <div>{feedBackMsg}</div>}
      </div>
      <p>
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginRequest: (email, password) =>
      dispatch(userLoginRequest(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
