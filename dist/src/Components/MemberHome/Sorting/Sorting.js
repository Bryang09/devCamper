import React from "react";

import "./Sorting.scss";
import HeadContainer from "./Head/HeadContainer";
import Sort from "./Sort/Sort";

const Sorting = props => {
  const {
    photo,
    name,
    zip,
    distance,
    onSort,
    onSubmitDistance,
    maxPrice,
    onSubmitPrice,
    onDistanceAndPrice,
    onLogout
  } = props;

  return (
    <div className="sortContainer">
      <HeadContainer photo={photo} name={name} />
      <Sort
        zip={zip}
        distance={distance}
        onSort={onSort}
        onSubmitDistance={onSubmitDistance}
        onSubmitPrice={onSubmitPrice}
        maxPrice={maxPrice}
        onDistanceAndPrice={onDistanceAndPrice}
        onLogout={onLogout}
      />
    </div>
  );
};

export default Sorting;
