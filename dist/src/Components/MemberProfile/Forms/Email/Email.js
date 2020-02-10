import React from "react";

const Email = props => {
  const { onHandleInput, onEmail } = props;
  return (
    <form onChange={onHandleInput}>
      <div className="input">
        <label htmlFor="name">Change Name</label>
        <input type="text" name="name" placeholder="New Name" />
      </div>
      <div className="input">
        <label htmlFor="email">Change Email</label>
        <input type="text" name="email" placeholder="New Email" />
      </div>

      <div className="submit">
        <h5 onClick={onEmail}>Submit</h5>
      </div>
    </form>
  );
};

export default Email;
