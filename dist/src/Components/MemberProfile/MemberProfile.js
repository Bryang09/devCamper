import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../keys";

export class MemberProfile extends Component {
  state = {
    tokenSuccess: null
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
      .then(res => console.log(res))
      .catch(err => console.log({ err }));
  };

  render() {
    const { tokenSuccess } = this.state;

    if (tokenSuccess === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>MP</h1>
      </div>
    );
  }
}

export default MemberProfile;
