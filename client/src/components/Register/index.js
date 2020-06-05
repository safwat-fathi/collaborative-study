import React from "react";

const Register = () => {
  return (
    <>
      <h3>Register</h3>
      <form>
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input
          name="confirm_password"
          type="password"
          placeholder="confirm password"
        />

        <input type="submit" value="Regitser" />
      </form>
    </>
  );
};

export default Register;
