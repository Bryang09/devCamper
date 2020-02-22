import React from "react";

import "./Reviews.scss";

const Reviews = props => {
  const { reviews } = props;

  console.log(reviews);

  const review = reviews.map(res => {
    const { title, rating, text } = res;
    return (
      <div className="review">
        <div className="userInfo">
          <div className="userPicture"></div>
          <div className="userName"></div>
        </div>
        <div className="reviewContent">
          <div className="container">
            <h4>{title}</h4>
            <h5>{rating}</h5>
            <br />
            <h6>{text}</h6>
          </div>
        </div>
      </div>
    );
  });

  return review;
};

export default Reviews;
