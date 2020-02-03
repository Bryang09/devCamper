import React from "react";

import { BASE_URL } from "../../../keys";

import "./Sorting.scss";

const Sorting = props => {
  console.log(props);
  const { photo, name } = props;

  return (
    <div className="sortContainer">
      <div className="headContainer">
        <div
          className="imgContainer"
          style={{
            backgroundImage: `url(${BASE_URL}/users/uploads/${photo})`
          }}
        ></div>
        <h4>{name}</h4>
      </div>
    </div>
  );
};

export default Sorting;
