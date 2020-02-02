import React from "react";

import "./Form.scss";
import "../../../App.scss";

import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

const LandingForm = props => {
  const {
    email,
    onChange,
    password,
    onSubmit,
    name,
    formType,
    onFormType,
    onRegister,
    owner,
    onOwner,
    onForgotPassword
  } = props;

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
          {formType === "login" ? (
            <LoginForm
              email={email}
              onChange={onChange}
              password={password}
              onFormType={onFormType}
              onSubmit={onSubmit}
            />
          ) : formType === "signup" ? (
            <RegisterForm
              email={email}
              onChange={onChange}
              password={password}
              onFormType={onFormType}
              onRegister={onRegister}
              name={name}
              owner={owner}
              onOwner={onOwner}
            />
          ) : (
            <ForgotPassword
              email={email}
              onChange={onChange}
              onFormType={onFormType}
              onForgotPassword={onForgotPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingForm;
