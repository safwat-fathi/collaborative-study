import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    nameValid: false,
    emailValid: false,
    passwordValid: false,
    feedBackMsg: "",
  };

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  validateField = (fieldName, fieldValue) => {
    let { feedBackMsg } = this.state;
    let { nameValid, emailValid, passwordValid } = this.state;

    switch (fieldName) {
      case "name":
        nameValid = /^[a-zA-Z]+/i.test(fieldValue) && fieldValue.length > 2;
        feedBackMsg = nameValid ? "" : "Please check Name!";
        break;
      case "email":
        emailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g.test(fieldValue);
        feedBackMsg = emailValid ? "" : "Please check Email!";
        break;
      case "password":
      case "confirm_password":
        passwordValid =
          fieldValue.length > 5 &&
          this.state.password === this.state.confirm_password;
        feedBackMsg = passwordValid ? "" : "Please check Password!";
        break;
      default:
        break;
    }

    this.setState({
      feedBackMsg,
      nameValid,
      emailValid,
      passwordValid,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let {
      name,
      email,
      password,
      nameValid,
      emailValid,
      passwordValid,
    } = this.state;

    let valid = nameValid && emailValid && passwordValid;

    if (!valid) {
      this.setState({
        feedBackMsg: "Please fill the form!",
      });

      return;
    }

    try {
      axios
        .post("http://localhost:8000/userReg", {
          name,
          email,
          password,
        })
        .then((res) => console.log(res));

      this.setState({
        feedBackMsg: "You have registered successfully!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInput}
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
          />
          <input
            onChange={this.handleInput}
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
          />
          <input
            onChange={this.handleInput}
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
          />
          <input
            onChange={this.handleInput}
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirm_password}
          />

          <input type="submit" value="Regitser" />
        </form>
        <div>{this.state.feedBackMsg}</div>
      </>
    );
  }
}

export default Register;
