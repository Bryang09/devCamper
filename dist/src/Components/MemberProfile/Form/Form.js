import React from "react";

const Form = () => {
  return (
    <>
      <form>
        <div className="input">
          <label htmlFor="name">Change Name</label>
          <input type="text" name="name" id="" placeholder="New Name" />
        </div>
        <div className="input">
          <label htmlFor="email">Change Email</label>
          <input type="text" name="email" id="" placeholder="Type New Email" />
        </div>
        <div className="input">
          <label htmlFor="password">Change Password</label>
          <input type="text" name="password" id="" placeholder="New Password" />
        </div>
        <div className="input role">
          <h5>Change Role</h5>
          <div className="options">
            <h6>User</h6>
            <h6>Publisher</h6>
          </div>
        </div>
        <div className="submitEdit">
          <h5>Submit</h5>
        </div>
      </form>
    </>
  );
};

export default Form;
