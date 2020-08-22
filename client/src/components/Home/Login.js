import React, { useState, useContext } from "react";
import axios from "axios";
import './login.css';
import splashimage from './splash.jpeg';
import { UserContext } from "../../context";

const Login = (props) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [ addClass ,setAddclass] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setFeedbackMsg("Please Check your Email or password");
      return;
    }
    axios
      .post("http://localhost:4000/users/login", { email, password })
      .then((res) => {
        let token = res.data.token;

        localStorage.setItem("userToken", token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setFeedbackMsg("Login failed, Please Check your Email or password");
      });
  };

  return (
    <>
    <div className="col-12">
      <h2 className="text-center mt-5">Collaborative Study</h2>
    </div>
    <div className="col-md-4 offset-md-4 col mt-5 login-profile" onClick={()=>{setAddclass(true)}}>
      <div className={`cover ${addClass ? 'd-none':''}`}>
        <img src={splashimage} alt="splash image" id="icon"/>
      </div>
      <h3 className="text-center mt-2 login-title">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput">email</label>
          <input
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
            className="form-control"
            id="passwordInput"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          value="Login"
        />
        <div className="form-group">
          <div className="btn form-group text-right mt-2 text-capitalize" onClick={ ()=> props.setForm(false) }>
               register
          </div>
        </div>
      </form>
      <div>{feedbackMsg}</div>
    </div>
    </>
  );
};

export default Login;
