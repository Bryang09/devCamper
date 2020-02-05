import React from "react";

import { BASE_URL } from "../../../keys";

import "./Sorting.scss";
import HeadContainer from "./Head/HeadContainer";
import Sort from "./Sort/Sort";

const Sorting = props => {
  console.log(props);
  const { photo, name, zip, distance, onSort } = props;

  return (
    <div className="sortContainer">
      <HeadContainer photo={photo} name={name} />
      <Sort zip={zip} distance={distance} onSort={onSort} />
    </div>
  );
};

export default Sorting;
