import React from "react";
import Form from "./Form/Form";

const Sort = props => {
  const { zip, distance, onSort } = props;

  return (
    <div className="sortFieldContainer">
      <Form zip={zip} distance={distance} onSort={onSort} />
    </div>
  );
};

export default Sort;
