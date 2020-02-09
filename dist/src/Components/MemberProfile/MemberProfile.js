import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../keys";

import "./MemberProfile.scss";

import Form from "./Form/Form";

export class MemberProfile extends Component {
  state = {
    tokenSuccess: null,
    user: false
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    //   Make sure there is a token
    if (localStorage.getItem("token") === null) {
      this.setState({ tokenSuccess: false });
    }

    // ------------------------------------------------
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => this.setState({ user: res.data.data }))
      .catch(err => console.log({ err }));
  };

  render() {
    const { tokenSuccess, user } = this.state;

    console.log(user);

    if (tokenSuccess === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="profileLanding">
        <div className="profileLandingContainer">
          <h1>Edit Profile</h1>
          <div className="formContainer">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default MemberProfile;
