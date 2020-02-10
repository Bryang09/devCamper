import React from "react";
import HeadContainer from "../../MemberHome/Sorting/Head/HeadContainer";

import "./Info.scss";
// FIND OUT WHY PHOTO IS NOT UPDATING WHEN CHANGED

const Info = props => {
  const { user, goBack } = props;
  const { name, email, role, photo } = user;

  return (
    <div className="sortContainer infoContainer">
      <HeadContainer photo={photo} name={name} />
      <div className="info">
        <h4>
          Email: <span>{email}</span>
        </h4>
        <h4>
          Role: <span>{role}</span>
        </h4>
        <div className="return">
          <h3 onClick={goBack}>Return</h3>
        </div>
      </div>
    </div>
  );
};

export default Info;
