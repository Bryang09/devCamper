import React from "react";

const Email = props => {
  const { onChange } = props;
  return (
    <div className="input">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Please Type Your Email"
        onChange={onChange}
      />
    </div>
  );
};

export default Email;
