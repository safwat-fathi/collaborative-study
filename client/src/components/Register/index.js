import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// validate fields helper
import { validateField } from "../../helpers";
import { api } from "../../helpers/api";
// useForm hook to validate form inputs
import { useFetch, useForm } from "../../hooks";

const Register = () => {
  // input field values
  const [inputValues, setInputValues] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // custom hook to post register form data
  const [response, callAPI] = useFetch({
    api,
    method: "post",
    url: "users/register",
    paylaod: {
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    },
  });

  const { data, error } = response;

  // component state
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [feedBackMsg, setFeedBackMsg] = useState(false);

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
    // if (passwordValid) {
    //   setPasswordValid(passwordValid);
    // }

    // setPasswordValid(passwordValid);
    setInputValues(e);
    setFeedBackMsg(feedBackMsg);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      setFeedBackMsg("Sorry, error occurred!");
    }

    if (data !== null) {
      console.log(data);
      setFeedBackMsg("You have registered successfully!");
    }
  }, [data, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = nameValid && emailValid; /* && passwordValid */

    if (!valid) {
      setFeedBackMsg("Please fill the form!");
      return;
    }

    callAPI();
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">name</label>
          <input
            autoComplete="on"
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            value={inputValues.name}
          />
        </div>
        <div>
          <label htmlFor="emailInput">email</label>
          <input
            autoComplete="on"
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            value={inputValues.email}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="on"
            value={inputValues.password}
          />
        </div>
        <div>
          <label htmlFor="ConfirmPasswordInput">Confirm Password</label>
          <input
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
            value={inputValues.confirmPassword}
          />
        </div>
        <div>
          <input type="submit" value="Regitser" />
        </div>
      </form>
      {feedBackMsg && <div>{feedBackMsg}</div>}
      <p>
        Do you have an account?
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
