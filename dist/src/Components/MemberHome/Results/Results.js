import React from "react";

import "./Results.scss";

import { BASE_URL } from "../../../keys.js";

import { Link } from "react-router-dom";

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
            <Link to={`/bootcamp/user/${_id}`}>
              <div
                className="bootcampImage"
                style={{
                  backgroundImage: `url(${BASE_URL}/uploads/${photo})`
                }}
              ></div>
            </Link>
          </div>

          <div className="bootcampInfo">
            <span className="name">
              <h3>{name}</h3>
              <h4>{averageRating}</h4>
            </span>

            <h5 className="averageCost">
              Average Cost: <span>${averageCost}</span>
            </h5>
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
      <div className="content">
        {bootcamps.length > 0 ? singleBootcamp : <h1>No Bootcamp</h1>}
      </div>
      <div className="pagination"></div>
    </div>
  );
};

export default Results;
