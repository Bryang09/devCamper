import React from "react";

import "./Reviews.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { BASE_URL } from "../../../keys";
import User from "./User";

const Reviews = props => {
  const { reviews, reviewUsers } = props;

  console.log(props);

  const review = reviews.map((res, i) => {
    const { title, rating, text, user } = res;

    return (
      <div className="review" key={i}>
        <div className="userInfo">
          {/*  */}
          {/* Map over reviews */}
          {/*  */}
          {reviewUsers.map((res, i) => {
            const { _id, photo, name } = res;
            // check if the user that made comment is same id as reviewUser array
            let check = _id === user;

            if (check) {
              return <User photo={photo} name={name} />;
            }
          })}
        </div>
        <div className="reviewContent">
          <div className="container">
            <h4>{title}</h4>
            <h5>
              <FontAwesomeIcon
                icon={rating > 7 ? faStar : faStarHalf}
                color={"#ff4343"}
              />
              <span>{rating}/10</span>
            </h5>
            <h6>{text}</h6>
          </div>
        </div>
      </div>
    );
  });

  return review;
};

export default Reviews;
