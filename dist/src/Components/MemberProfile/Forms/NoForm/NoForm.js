import React from "react";

import "./NoForm.scss";

const NoForm = props => {
  const { onFormType } = props;
  return (
    <div className="noForm">
      <div className="formType email">
        <h4 onClick={() => onFormType("email")}>Change Email or Name</h4>
      </div>
      <div className="formType password">
        <h4 onClick={() => onFormType("password")}>Change Password</h4>
      </div>

      <div className="formType picture">
        <h4>Change Picture</h4>
      </div>
    </div>
  );
};

export default NoForm;
