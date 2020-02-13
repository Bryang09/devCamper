import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../keys";

import "./BootcampLanding.scss";
import Info from "./Info/Info";

export class BootcampLanding extends Component {
  state = {
    tokenSuccess: null,
    user: null,
    bootcamp: null
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    //   Make sure there is a token
    if (localStorage.getItem("token") === null) {
      this.setState({ tokenSuccess: false });
    }

    // ------------------------------------------------
    // Get User Info
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        this.setState(
          {
            user: res.data.data
          },
          this.onGetBootcamp
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  onGetBootcamp = () => {
    const { bootcampId } = this.props.match.params;
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/bootcamps/${bootcampId}`
    })
      .then(res => this.setState({ bootcamp: res.data.data }, console.log(res)))
      .catch(err => console.log(err));
  };
  render() {
    const { tokenSuccess, bootcamp } = this.state;
    if (tokenSuccess === false) {
      return <Redirect to="/" />;
    }
    console.log(this.state);

    if (bootcamp !== null) {
      const {
        name,
        photo,
        location,
        website,
        phone,
        email,
        description,
        careers
      } = bootcamp;

      return (
        <div className="BootcampLanding">
          <div className="infoSection">
            <Info
              name={name}
              photo={photo}
              location={location}
              website={website}
              phone={phone}
              email={email}
              description={description}
              careers={careers}
            />
          </div>
          <div className="commentSection">
            <h1>comments</h1>
          </div>
        </div>
      );
    }

    return <h1>Loading</h1>;
  }
}

export default BootcampLanding;
