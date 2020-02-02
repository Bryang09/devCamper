import React, { Component } from "react";

import LandingForm from "./Form/Form";
import LandingBackground from "./Bg/Bg";

import axios from "axios";

import "./Landing.scss";

class Landing extends Component {
  componentDidMount = () => {
    axios.get("/api/v1/bootcamps").then(res => console.log(res));
  };
  render() {
    return (
      <div className="Landing">
        <LandingForm />
        <LandingBackground />
      </div>
    );
  }
}

export default Landing;
