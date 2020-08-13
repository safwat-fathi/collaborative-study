import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Navbar';

const Profile = () => {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    // clearing state after user is done editing
    return () => {
      setOldEmail("");
      setOldPassword("");
      setNewEmail("");
      setNewPassword("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (newEmail === "" || oldPassword === "" || newPassword === "") {
      setFeedbackMsg("Please Check your Email or password");
      return;
    }
    // axios
    //   .post("http://localhost:4000/users/login", { email, password })
    //   .then((res) => {
    //     let token = res.data.token;

    //     localStorage.setItem("userToken", token);
    //     setIsLoggedIn(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setFeedbackMsg("Login failed, Please Check your Email or password");
    //   });
  };

  return (
    <>
    <Navbar edit />
    <div className="col-md-6 offset-md-3 col mt-5">
      <h3 className="text-center">edit profile</h3>
      <form className="form-group" onSubmit={handleSubmit}>
        {/* change email */}
        <div className="form-group">
          <label htmlFor="emailInput">Old Email</label>
          <input
            className="form-control"
            id="emailInput"
            type="email"
            placeholder="Old Email"
            onChange={(e) => setOldEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="NewemailInput">New Email</label>
          <input
            className="form-control"
            id="NewemailInput"
            type="email"
            placeholder="Enter New Email"
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        {/* change password */}
        <div className="form-group">
          <label htmlFor="passwordInput">Old Password</label>
          <input
            className="form-control"
            id="passwordInput"
            type="password"
            placeholder="Enter Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="NewpasswordInput">Old Password</label>
          <input
            className="form-control"
            id="NewpasswordInput"
            type="password"
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <input
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          value="Save"
        />
      </form>
      <div>{feedbackMsg}</div>
    </div>
    </>
  );
};

export default Profile;
