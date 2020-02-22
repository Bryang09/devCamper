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
    reviews: null,
    reviewUsers: []
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
      .then(res =>
        this.setState(
          { reviews: res.data.data },
          this.onGetBootcampReviewsUsers
        )
      )
      .catch(err => console.log(err));
  };

  // Get Information of the user that made comment
  onGetBootcampReviewsUsers = () => {
    const token = localStorage.getItem("token");

    const { reviews } = this.state;

    const getReviewUser = reviews.map(res => {
      const { user } = res;

      axios({
        method: "get",
        url: `${BASE_URL}/api/v1/users/${user}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          let newUsers = res.data.data;

          this.setState({
            reviewUsers: this.state.reviewUsers.concat(newUsers)
          });
        })
        .catch(err => console.log(err));
    });

    return getReviewUser;
  };

  render() {
    const { tokenSuccess, bootcamp, reviews, reviewUsers } = this.state;
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
            <h2 style={{ textAlign: "center", fontWeight: 400 }}>Reviews</h2>
            <Reviews reviews={reviews} reviewUsers={reviewUsers} />
          </div>
        </div>
      );
    }

    return <h1>Loading</h1>;
  }
}

export default BootcampLanding;
