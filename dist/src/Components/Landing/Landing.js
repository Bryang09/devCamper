import React, { Component } from "react";

import LandingForm from "./Form/Form";
import LandingBackground from "./Bg/Bg";
import Error from "../ErrorMessage/Error";

import axios from "axios";

import "./Landing.scss";

import { BASE_URL } from "../../keys";

class Landing extends Component {
  state = {
    email: null,
    password: null,
    statusCode: null,
    errMessage: null,
    success: false
  };

  componentDidMount = () => {};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
        const statusCode = res.status;

        localStorage.setItem("token", token);

        console.log(res);
      })
      .catch(err => {
        const errorResponse = { err };
        // const { errorResponse } = errorRespone.err;
        const statusCode = errorResponse.err.response.status;
        const { success, error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  render() {
    const { email, password, errMessage, statusCode } = this.state;

    console.log(errMessage, statusCode);

    return (
      <div className="Landing">
        <Error errMessage={errMessage} statusCode={statusCode} />
        <LandingForm
          email={email}
          password={password}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <LandingBackground />
      </div>
    );
  }
}

export default Landing;
