import React from "react";

import "./Form.scss";

const Form = props => {
  const {
    zip,
    distance,
    onSort,
    onSubmitDistance,
    maxPrice,
    onSubmitPrice,
    onDistanceAndPrice
  } = props;

  console.log(zip, distance, maxPrice);

  return (
    <form id="sort" onChange={onSort}>
      <div className="input">
        <label htmlFor="maxPrice">Search By Max Price</label>
        <input type="number" name="maxPrice" placeholder="Enter Max Price" />
      </div>
      <div className="input">
        <label htmlFor="zip">Search Near You</label>
        <input type="number" name="zip" placeholder="Enter Zip Code" />
      </div>

      {zip !== null && zip.length === 5 ? (
        <div className="input">
          <label htmlFor="distance">Distance</label>
          <input
            type="number"
            name="distance"
            placeholder="Max Distance(in miles)"
          />
        </div>
      ) : (
        ""
      )}
      {/* Check if distance changed but not maxPrice 
          ONLY SEARCH FOR DISTANCE
      */}

      {distance !== null && distance.length > 0 && maxPrice === null ? (
        <h4 className="submitSort" onClick={onSubmitDistance}>
          Submit
        </h4>
      ) : //
      // Check if only maxPrice Changed
      // ONLY SEARCH FOR PRICE
      distance === null &&
        maxPrice !== null &&
        maxPrice.length > 0 &&
        zip === null ? (
        <h4 className="submitSort" onClick={onSubmitPrice}>
          Submit
        </h4>
      ) : zip !== null &&
        distance !== null &&
        maxPrice !== null &&
        zip.length > 0 &&
        distance.length > 0 &&
        maxPrice > 0 ? (
        // Check if all have changed
        // SEARCH BY DISTANCE, THEN FILTER PRICE
        <h4 className="submitSort" onClick={onDistanceAndPrice}>
          Submit
        </h4>
      ) : (
        ""
      )}
    </form>
  );
};

export default Form;
