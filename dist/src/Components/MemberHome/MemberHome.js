import React, { Component } from "react";

import axios from "axios";

import { BASE_URL } from "../../keys";

import "./MemberHome.scss";
import Sorting from "./Sorting/Sorting";
import Results from "./Results/Results";

export class MemberHome extends Component {
  state = {
    photo: null,
    _id: null,
    name: null,
    email: null,
    bootcamps: []
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");

    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const { photo, _id, name, email } = res.data.data;
        this.setState({ photo, _id, name, email }, this.getBootcamps);
        console.log(res);
      })
      .catch(err => console.log({ err }));
  };

  getBootcamps = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/bootcamps`
    })
      .then(res =>
        this.setState({ bootcamps: res.data.data }, console.log(res.data))
      )
      .catch(err => console.log({ err }));
  };

  render() {
    const { photo, _id, name, email, bootcamps } = this.state;
    console.log(bootcamps);
    return (
      <div className="memberLanding">
        <div className="sort">
          <Sorting photo={photo} _id={_id} name={name} email={email} />
        </div>
        <div className="results">
          <Results bootcamps={bootcamps} />
        </div>
      </div>
    );
  }
}

export default MemberHome;
