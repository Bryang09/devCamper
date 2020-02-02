import React, { Component } from "react";

import LandingForm from "./Form/Form";
import LandingBackground from "./Bg/Bg";
import Error from "../ErrorMessage/Error";

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
    loginForm: true,
    role: "user"
  };

  componentDidMount = () => {};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormType = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  onSubmit = () => {
    const { email, password } = this.state;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/auth/login`,
      data: { email, password },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        const { success, token } = res.data;

        localStorage.setItem("token", token);

        this.setState({ success: true });
      })
      .catch(err => {
        const errorResponse = { err };
        // const { errorResponse } = errorRespone.err;
        const statusCode = errorResponse.err.response.status;
        const { success, error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  onRegister = () => {
    const { email, password, name, role } = this.state;

    axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/auth/register`,
      data: { name, email, password, role },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        const { success, token } = res.data;

        localStorage.setItem("token", token);

        this.setState({ success: true });
      })
      .catch(err => {
        const errorResponse = { err };

        const statusCode = errorResponse.err.response.status;
        const { success, error } = errorResponse.err.response.data;

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
      loginForm,
      owner
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
          loginForm={loginForm}
          onFormType={this.onFormType}
          owner={owner}
          onOwner={this.onOwner}
        />
        <LandingBackground />
      </div>
    );
  }
}

export default Landing;
