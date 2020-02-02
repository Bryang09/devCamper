import React from "react";

import Email from "../Email/Email";
import Password from "../Password/Password";

const LoginForm = props => {
  const { email, onChange, password, onSubmit, onFormType } = props;

  return (
    <form>
      <Email email={email} onChange={onChange} />
      <Password password={password} onChange={onChange} />
      <span className="loginBtn">
        <h4 onClick={onSubmit}>Login</h4>
      </span>{" "}
      <span>
        <h6 onClick={e => onFormType("forgotPassword")}>Forgot Password</h6>
      </span>
      <div className="signUp">
        <h5>Not Registered?</h5>
        <h6 onClick={() => onFormType("signup")}>Sign Up</h6>
      </div>
    </form>
  );
};

export default LoginForm;
