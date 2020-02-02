import React from "react";

import Email from "../Email/Email";
import Password from "../Password/Password";

const LoginForm = props => {
  const { email, onChange, password, onSubmit, onFormType } = props;

  return (
    <form>
      <Email email={email} onChange={onChange} />
      <Password password={password} onChange={onChange} />
      <div className="loginBtn">
        <h4 onClick={onSubmit}>Login</h4>
      </div>
      <div className="signUp">
        <h5>Not Registered?</h5>
        <h6 onClick={onFormType}>Sign Up</h6>
      </div>
    </form>
  );
};

export default LoginForm;
