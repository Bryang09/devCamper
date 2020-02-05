import React from "react";
import Form from "./Form/Form";

const Sort = props => {
  const { zip, distance, onSort, onSubmitSort } = props;

  return (
    <div className="sortFieldContainer">
      <Form
        zip={zip}
        distance={distance}
        onSort={onSort}
        onSubmitSort={onSubmitSort}
      />
    </div>
  );
};

export default Sort;
