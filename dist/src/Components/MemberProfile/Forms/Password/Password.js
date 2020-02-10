import React from "react";

const Password = props => {
  const { onHandleInput, onUpdatePassword, onSkip } = props;

  return (
    <form onChange={onHandleInput}>
      <div className="input">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
        />
      </div>
      <div className="input">
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" placeholder="New Password" />
      </div>
      <div className="submit">
        <h5 onClick={onUpdatePassword}>Submit</h5>
        <h5 className="skip" onClick={onSkip}>
          Skip
        </h5>
      </div>
    </form>
  );
};

export default Password;
