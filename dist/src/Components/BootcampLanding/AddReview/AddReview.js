import React, { Component } from "react";

import "./AddReview.scss";
import Form from "./Form";

class AddReview extends Component {
  state = {
    title: null,
    rating: null,
    review: null
  };

  onInput = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  onRating = param => {
    this.setState({ rating: param });
  };

  render() {
    const { addReview, onReview } = this.props;
    const { rating, title, review } = this.state;

    const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    console.log(this.state);

    let check =
      title !== null &&
      rating !== null &&
      review !== null &&
      title.length > 0 &&
      review.length > 0;

    return (
      <div
        className="addReview"
        style={addReview ? { display: "flex" } : { display: "none" }}
      >
        <div className="reviewSection">
          <h5>Review Section</h5>
          <Form
            onInput={this.onInput}
            rating={rating}
            ratings={ratings}
            onRating={this.onRating}
          />
          <h5 className={check ? "submit submitActive" : "submit"}>Submit</h5>
          <h6 id="close" onClick={onReview}>
            Close
          </h6>
        </div>
      </div>
    );
  }
}

export default AddReview;
