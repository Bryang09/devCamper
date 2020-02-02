import React from "react";

import Email from "../Email/Email";
import Password from "../Password/Password";
import Name from "../Name/Name";

const RegisterForm = props => {
  const {
    email,
    onChange,
    password,
    name,
    onRegister,
    onFormType,
    onOwner
  } = props;

  return (
    <form>
      <Name name={name} onChange={onChange} />
      <Email email={email} onChange={onChange} />
      <Password password={password} onChange={onChange} />
      <div className="checkbox">
        <input type="checkbox" name="owner" onChange={onOwner} />
        <label htmlFor="owner">I am Bootcamp Owner</label>
      </div>

      <div className="loginBtn">
        <h4 onClick={onRegister}>Sign Up</h4>
      </div>
      <div className="signUp">
        <h5>Already Registered?</h5>
        <h6 onClick={() => onFormType("login")}>Log In</h6>
      </div>
    </form>
  );
};

export default RegisterForm;
