import React from "react";

import Email from "../Email/Email";
import Password from "../Password/Password";
import Name from "../Name/Name";
import Token from "../Token/Token";

const ResetPassword = props => {
  const { onChange, password, token, onNewPassword, onFormType } = props;

  return (
    <form>
      <Token token={token} onChange={onChange} />
      <Password password={password} onChange={onChange} />

      <div className="loginBtn">
        <h4 onClick={onNewPassword}>Reset</h4>
      </div>
      <div className="signUp">
        <h5>Already Registered?</h5>
        <h6 onClick={() => onFormType("login")}>Log In</h6>
      </div>
    </form>
  );
};

export default ResetPassword;
