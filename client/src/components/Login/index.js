import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
// redux actions
import { userLoginRequest } from "../../actions/user.actions";
// import { api } from "../../helpers/api";
// import { useFetch } from "../../hooks";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackMsg, setFeedBackMsg] = useState("");
  const { user, userLoginRequest, error } = props;
  const location = useLocation();

  // custom hook to post login form data
  // const [response, callAPI] = useFetch({
  //   api,
  //   url: "users/login",
  //   method: "post",
  //   paylaod: { email, password },
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // const { data, error } = response;

  // useEffect(() => {
  //   if (error) {
  //     setFeedBackMsg("Sorry, error occurred!");
  //   }

  //   if (data !== null) {
  //     let token = data.token;
  //     localStorage.setItem("userToken", token);
  //   }
  // }, [data, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { path: "/rooms" } };
      console.log("from: ", from);
      userLoginRequest(email, password, from);
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
        <Link to="/login">Login</Link>
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
