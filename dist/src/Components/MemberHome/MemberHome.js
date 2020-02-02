import React, { Component } from "react";

import axios from "axios";

import { BASE_URL } from "../../keys";

export class MemberHome extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("token");

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
    return (
      <div>
        <h1>Member</h1>
      </div>
    );
  }
}

export default MemberHome;
