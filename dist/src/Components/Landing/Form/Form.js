import React from "react";

import "./Form.scss";
import "../../../App.scss";

import Email from "./Email/Email";
import Password from "./Password/Password";

const LandingForm = props => {
  console.log(props);
  const { email, onChange, password, onSubmit } = props;

  return (
    <div className="landingForm">
      <div className="landingFormContainer">
        <div className="fromHeader">
          <h1>
            Welcome To <br />
            <span>DevCamper</span>
          </h1>
        </div>
        <div className="form">
          <form>
            <Email email={email} onChange={onChange} />
            <Password password={password} onChange={onChange} />
            <div className="loginBtn">
              <h4 onClick={onSubmit}>Login</h4>
            </div>
            <div className="signUp">
              <h5>Not Registered?</h5>
              <h6>Sign Up</h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingForm;
