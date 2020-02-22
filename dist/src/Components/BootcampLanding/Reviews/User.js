import React from "react";

import { BASE_URL } from "../../../keys";

const User = props => {
  const { photo, name } = props;
  return (
    <>
      <div
        className="userPicture"
        style={{
          backgroundImage: `url(${BASE_URL}/users/uploads/${photo})`
        }}
      ></div>
      <div className="userName">
        <h4>{name}</h4>
      </div>
    </>
  );
};

export default User;
