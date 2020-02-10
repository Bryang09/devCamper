import React, { Component } from "react";

import LandingForm from "./Form/Form";
import LandingBackground from "./Bg/Bg";
import Error from "../Alert/ErrorMessage/Error";

import axios from "axios";

import { Redirect } from "react-router-dom";

import "./Landing.scss";

import { BASE_URL } from "../../keys";

class Landing extends Component {
  state = {
    email: null,
    password: null,
    name: null,
    statusCode: null,
    errMessage: null,
    success: false,
    formType: "login",
    role: "user",
    fpSent: false, //ForgottenPassword
    token: null
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  // Change form type, ie. login,signup
  onFormType = param => {
    this.setState({ formType: param });
  };

  // Login User
  onSubmit = () => {
    const { email, password } = this.state;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/auth/login`,
      data: { email, password },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        const { token } = res.data;

        localStorage.setItem("token", token);

        this.setState({ success: true });
      })
      .catch(err => {
        const errorResponse = { err };
        // const { errorResponse } = errorRespone.err;
        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  // Register new user
  onRegister = () => {
    const { email, password, name, role } = this.state;

    axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/auth/register`,
      data: { name, email, password, role },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        const { token } = res.data;

        localStorage.setItem("token", token);

        this.setState({ success: true });
      })
      .catch(err => {
        const errorResponse = { err };

        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };
  // Get token to change forgotten password
  onForgotPassword = () => {
    const { email } = this.state;
    axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/auth/forgotpassword`,
      data: { email },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        this.setState({ fpSent: true, formType: "reset" });
      })
      .catch(err => {
        const errorResponse = { err };

        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  onNewPassword = () => {
    const { token, password } = this.state;
    axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/auth/resetpassword/${token}`,
      data: { password },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        const { token } = res.data;

        localStorage.setItem("token", token);

        this.setState({ success: true });
      })
      .catch(err => {
        const errorResponse = { err };

        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  onOwner = e => {
    this.setState(e.target.checked ? { role: "publisher" } : { role: "user" });
  };

  render() {
    const {
      email,
      password,
      name,
      errMessage,
      statusCode,
      success,
      formType,
      owner,
      fpSent
    } = this.state;

    if (success) {
      return <Redirect to={"/member/home"} />;
    }

    return (
      <div className="Landing">
        <Error errMessage={errMessage} statusCode={statusCode} />
        <LandingForm
          email={email}
          password={password}
          name={name}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onRegister={this.onRegister}
          formType={formType}
          onFormType={this.onFormType}
          owner={owner}
          onOwner={this.onOwner}
          onForgotPassword={this.onForgotPassword}
          fpSent={fpSent}
          onNewPassword={this.onNewPassword}
        />
        <LandingBackground />
      </div>
    );
  }
}

export default Landing;
