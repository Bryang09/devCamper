import React from "react";

import NoForm from "./NoForm/NoForm";
import Email from "./Email/Email";
import Password from "./Password/Password";

const Form = props => {
  const {
    onHandleInput,
    onSubmitChanges,
    onRoleChange,
    onUpdatePassword,
    formType,
    onFormType,
    onEmail,
    onSkip
  } = props;

  if (formType === "none") {
    return <NoForm onFormType={onFormType} />;
  } else if (formType === "email") {
    return (
      <Email onHandleInput={onHandleInput} onEmail={onEmail} onSkip={onSkip} />
    );
  } else if (formType === "password") {
    return (
      <Password
        onHandleInput={onHandleInput}
        onUpdatePassword={onUpdatePassword}
        onSkip={onSkip}
      />
    );
  }
  return {
    /* <>
       <form onChange={onHandleInput}>
        <div className="input">
          <label htmlFor="name">Change Name</label>
          <input type="text" name="name" placeholder="New Name" />
        </div>
        <div className="input">
          <label htmlFor="email">Change Email</label>
          <input type="text" name="email" placeholder="New Email" />
        </div>
        <div className="input">
          <label htmlFor="password">Change Password</label>
          <input
            type="text"
            name="password"
            placeholder="New Password"
            onChange={onPasswordChangeInput}
          />
        </div>
        <div className="input role">
          <h5>Change Role</h5>
          <div className="options">
            <h6
              onClick={() => onRoleChange("user")}
              className={role === "user" ? "roleSelected" : ""}
            >
              User
            </h6>
            <h6
              onClick={() => onRoleChange("publisher")}
              className={role === "publisher" ? "roleSelected" : ""}
            >
              Publisher
            </h6>
          </div>
        </div>
        <div className="input imgUpload">
          <label htmlFor="photo"></label>
          <input type="file" name="photo" />
        </div>
        <div className="submitEdit">
          <h5 onClick={onSubmitChanges}>Submit</h5>
        </div>
      </form>
    </> */
  };
};

export default Form;
