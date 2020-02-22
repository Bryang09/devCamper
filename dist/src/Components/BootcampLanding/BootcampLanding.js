import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../keys";

import "./BootcampLanding.scss";
import Info from "./Info/Info";
import Reviews from "./Reviews/Reviews";

export class BootcampLanding extends Component {
  state = {
    tokenSuccess: null,
    user: null,
    bootcamp: null,
    reviews: null
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
      .then(res =>
        this.setState({ bootcamp: res.data.data }, this.onGetBootcampReviews)
      )
      .catch(err => console.log(err));
  };

  onGetBootcampReviews = () => {
    const { bootcamp } = this.state;
    const { _id } = bootcamp;

    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/bootcamps/${_id}/reviews`
    })
      .then(res => this.setState({ reviews: res.data.data }))
      .catch(err => console.log(err));
  };

  render() {
    const { tokenSuccess, bootcamp, reviews } = this.state;
    if (tokenSuccess === false) {
      return <Redirect to="/" />;
    }
    console.log(this.state);

    if (bootcamp !== null && reviews !== null) {
      const {
        name,
        photo,
        location,
        website,
        phone,
        email,
        description,
        careers,
        housing,
        jobAssistance,
        jobGuarantee,
        acceptGi
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
              housing={housing}
              jobAssistance={jobAssistance}
              jobGuarantee={jobGuarantee}
              acceptGi={acceptGi}
            />
          </div>
          <div className="reviewSection">
            <Reviews reviews={reviews} />
          </div>
        </div>
      );
    }

    return <h1>Loading</h1>;
  }
}

export default BootcampLanding;
