import React from "react";

const Password = props => {
  const { onChange } = props;
  return (
    <div className="input">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Please Type Your Password"
        onChange={onChange}
      />
    </div>
  );
};

export default Password;
