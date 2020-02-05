import React from "react";

import "./Form.scss";

const Form = props => {
  const { zip, distance, onSort } = props;

  console.log(zip, distance);

  return (
    <form id="sort" onChange={onSort}>
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
      {distance !== null && distance.length > 0 ? (
        <h4 className="submitSort">Submit</h4>
      ) : null}
      {/* <input type="number" name="distance" placeholder="Max Distance" /> */}
    </form>
  );
};

export default Form;
