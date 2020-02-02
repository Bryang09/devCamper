import React, { Component } from "react";

import "./Error.scss";

export class Error extends Component {
  componentDidUpdate = () => {
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  };

  render() {
    const { errMessage, statusCode } = this.props;

    console.log(statusCode);
    if (statusCode !== null) {
      let activeClass = "Active";

      return (
        <div className={`Error ${activeClass}`}>
          <h5>{errMessage}</h5>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Error;
