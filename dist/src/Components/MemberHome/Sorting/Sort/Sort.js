import React from "react";
import Form from "./Form/Form";

const Sort = props => {
  const {
    zip,
    distance,
    onSort,
    onSubmitDistance,
    onSubmitPrice,
    maxPrice,
    onDistanceAndPrice,
    onLogout
  } = props;

  return (
    <div className="sortFieldContainer">
      <Form
        zip={zip}
        distance={distance}
        onSort={onSort}
        onSubmitDistance={onSubmitDistance}
        onSubmitPrice={onSubmitPrice}
        maxPrice={maxPrice}
        onDistanceAndPrice={onDistanceAndPrice}
      />
      <div className="logout">
        <h5 onClick={onLogout}>Logout</h5>
      </div>
    </div>
  );
};

export default Sort;
