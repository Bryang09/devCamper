import React, { Component } from "react";

import "./Error.scss";

const Error = props => {
  const { errMessage, statusCode } = props;

  if (statusCode !== null) {
    return (
      <div className={`Error Active`}>
        <h5>{errMessage}</h5>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Error;
