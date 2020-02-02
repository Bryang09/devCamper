import React from "react";

const Name = props => {
  const { onChange } = props;
  return (
    <div className="input">
      <label htmlFor="name">Name</label>
      <input
        type="name"
        name="name"
        placeholder="Please Type Your Name"
        onChange={onChange}
      />
    </div>
  );
};

export default Name;
