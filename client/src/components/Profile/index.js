import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        {/* change email */}
        <input
          className="form-control"
          type="email"
          placeholder="Enter Old Email"
          onChange={(e) => setOldEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="email"
          placeholder="Enter New Email"
          onChange={(e) => setNewEmail(e.target.value)}
        />

        {/* change password */}
        <input
          className="form-control"
          type="password"
          placeholder="Enter Old Password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Enter New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      {/* <form className="form-group" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="password"
          placeholder="Enter Old Password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Enter New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Save new password</button>
      </form> */}
    </div>
  );
};

export default Profile;
