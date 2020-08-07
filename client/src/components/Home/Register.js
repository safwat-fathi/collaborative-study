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
        .post("http://localhost:4000/users/register", {
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
      <div className="col-md-6 offset-md-3 col mt-5">
        <h3 className="text-center">Register</h3>
        <form className="text-center" className="form-group" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">name</label>
            <input
              className="form-control"
              onChange={this.handleInput}
              name="name"
              type="text"
              placeholder="Name"
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">email</label>
            <input
              className="form-control"
              onChange={this.handleInput}
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
            />
          </div>
          <div className="form-group"> 
            <label htmlFor="passwordInput">Password</label>
            <input
              className="form-control"
              onChange={this.handleInput}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              value={this.state.password}
            />
          </div>
          <div className="form-group"> 
            <label htmlFor="ConfirmPasswordInput">Confirm Password</label>
            <input
              className="form-control"
              onChange={this.handleInput}
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              autoComplete="on"
              value={this.state.confirm_password}
            />
          </div>
          <div className="form-group">
            <input className="btn btn-primary btn-lg btn-block" type="submit" value="Regitser" />
          </div>
        </form>
        <div>{this.state.feedBackMsg}</div>
      </div>
    );
  }
}

export default Register;
