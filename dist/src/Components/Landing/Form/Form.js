import React from "react";

import "./Form.scss";
import "../../../App.scss";

import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";

const LandingForm = props => {
  const {
    email,
    onChange,
    password,
    onSubmit,
    name,
    loginForm,
    onFormType,
    onRegister,
    owner,
    onOwner
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
          {loginForm ? (
            <LoginForm
              email={email}
              onChange={onChange}
              password={password}
              onFormType={onFormType}
              onSubmit={onSubmit}
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingForm;
