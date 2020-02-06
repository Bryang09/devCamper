import React from "react";

import { BASE_URL } from "../../../keys";

import "./Sorting.scss";
import HeadContainer from "./Head/HeadContainer";
import Sort from "./Sort/Sort";

const Sorting = props => {
  console.log(props);
  const {
    photo,
    name,
    zip,
    distance,
    onSort,
    onSubmitDistance,
    maxPrice,
    onSubmitPrice,
    onDistanceAndPrice
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
      />
    </div>
  );
};

export default Sorting;
