import React, { useState } from "react";
import axios from "axios";
// validate fields helper
import { validateField } from "../../helpers";
// useForm hook to validate form inputs
import { useForm } from "../../hooks";

const Register = () => {
  // component state
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [feedBackMsg, setFeedBackMsg] = useState(false);
  // input field values
  const [inputValues, setInputValues] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let { nameValid, emailValid, passwordValid, feedBackMsg } = validateField(
      e.target.name,
      e.target.value,
      inputValues
    );

    if (nameValid) {
      setNameValid(nameValid);
    }
    if (emailValid) {
      setEmailValid(emailValid);
    }
    // setPasswordValid(passwordValid);
    setFeedBackMsg(feedBackMsg);
    setInputValues(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = nameValid && emailValid; /* && passwordValid */

    if (!valid) {
      setFeedBackMsg("Please fill the form!");
      return;
    }

    try {
      axios
        .post("http://localhost:4000/users/register", {
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
        })
        .then((res) => console.log(res));

      setFeedBackMsg("You have registered successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-profile">
      <h3 className="text-center register-title">Register</h3>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">name</label>
          <input
            autoComplete="on"
            className="form-control"
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            value={inputValues.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">email</label>
          <input
            autoComplete="on"
            className="form-control"
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            value={inputValues.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="on"
            value={inputValues.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ConfirmPasswordInput">Confirm Password</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
            value={inputValues.confirmPassword}
          />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            value="Regitser"
          />
        </div>
      </form>
      {feedBackMsg && <div>{feedBackMsg}</div>}
    </div>
  );
};

export default Register;
