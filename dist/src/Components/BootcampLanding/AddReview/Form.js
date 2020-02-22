import React from "react";

const Form = props => {
  const { onInput, rating, ratings, onRating } = props;
  return (
    <div className="reviewForm">
      <form onChange={onInput}>
        <div className="input name">
          <input type="text" name="title" placeholder="Please Type Title" />
        </div>
        <div className="input reviewInput">
          <textarea
            name="review"
            cols="30"
            rows="10"
            placeholder="Please Type Review"
          ></textarea>
        </div>
      </form>

      <div className="rating">
        <h5>How Did You Enjoy The Bootcamp?</h5>
        <div className="ratings">
          {ratings.map(res => {
            return (
              <h6
                onClick={() => onRating(res)}
                className={rating === res ? "active" : "notactive"}
                key={res}
              >
                {res}
              </h6>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Form;
