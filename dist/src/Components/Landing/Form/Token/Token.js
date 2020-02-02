import React from "react";

const Token = props => {
  const { onChange } = props;
  return (
    <div className="input">
      <label htmlFor="token">Token</label>
      <input
        type="token"
        name="token"
        placeholder="Please Type Token You Received"
        onChange={onChange}
      />
    </div>
  );
};

export default Token;
