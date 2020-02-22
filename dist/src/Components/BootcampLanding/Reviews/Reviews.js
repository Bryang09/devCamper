import React from "react";

import "./Reviews.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reviews = props => {
  const { reviews } = props;

  console.log(reviews);

  const review = reviews.map((res, i) => {
    const { title, rating, text } = res;
    return (
      <div className="review" key={i}>
        <div className="userInfo">
          <div className="userPicture"></div>
          <div className="userName">
            <h4>Bryan Gonzalez</h4>
          </div>
        </div>
        <div className="reviewContent">
          <div className="container">
            <h4>{title}</h4>
            <h5>{rating}/10</h5>
            <h6>{text}</h6>
          </div>
        </div>
      </div>
    );
  });

  return review;
};

export default Reviews;
