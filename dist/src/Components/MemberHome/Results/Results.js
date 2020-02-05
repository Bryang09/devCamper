import React from "react";

import "./Results.scss";

import { BASE_URL } from "../../../keys.js";

const Results = props => {
  const { bootcamps } = props;

  const singleBootcamp = bootcamps.map(bootcamp => {
    const {
      photo,
      name,
      description,
      website,
      phone,
      averageCost,
      averageRating,
      _id
    } = bootcamp;

    const { formattedAddress } = bootcamp.location;

    return (
      <div className="singleBootcamp" key={_id}>
        <div className="singleBootcampContainer">
          <div className="bootcampImageContainer">
            <div
              className="bootcampImage"
              style={{
                backgroundImage: `url(${BASE_URL}/uploads/${photo})`
              }}
            ></div>
          </div>

          <div className="bootcampInfo">
            <span className="name">
              <h3>{name}</h3>
              <h4>{averageRating}</h4>
            </span>

            <h5>{formattedAddress}</h5>
            <h5>{website}</h5>
            <h5>{phone}</h5>

            <p>{description}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="resultsContainer">
      <div className="header">
        <h2>Bootcamps</h2>
      </div>
      <div className="content">{singleBootcamp}</div>
      <div className="pagination"></div>
    </div>
  );
};

export default Results;
