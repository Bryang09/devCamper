import React from "react";

import { BASE_URL } from "../../../../keys";

const HeadContainer = props => {
  const { photo, name } = props;
  return (
    <div className="headContainer">
      <div
        className="imgContainer"
        style={{
          backgroundImage: `url(${BASE_URL}/users/uploads/${photo})`
        }}
      ></div>
      <h4>{name}</h4>
    </div>
  );
};

export default HeadContainer;
