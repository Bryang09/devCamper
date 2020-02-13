import React from "react";

import Email from "../Email/Email";

const ForgotPassword = props => {
  const { email, onChange, onForgotPassword, onFormType } = props;

  return (
    <form>
      <Email email={email} onChange={onChange} />

      <div className="loginBtn">
        <h4 onClick={onForgotPassword}>Send</h4>
      </div>
      <div className="signUp">
        <h5>Not Registered?</h5>
        <h6 onClick={() => onFormType("signup")}>Sign Up</h6>
      </div>
    </form>
  );
};

export default ForgotPassword;
