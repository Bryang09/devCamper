import React from "react";

import { BASE_URL } from "../../../../keys";

import { Link } from "react-router-dom";

const HeadContainer = props => {
  const { photo, name } = props;
  return (
    <div className="headContainer">
      <Link to="/member/profile">
        <div
          className="imgContainer"
          style={{
            backgroundImage: `url(${BASE_URL}/users/uploads/${photo})`
          }}
        ></div>
      </Link>
      <h4>{name}</h4>
    </div>
  );
};

export default HeadContainer;
