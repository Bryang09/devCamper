import React from "react";

import { BASE_URL } from "../../../../keys";

const Personal = props => {
  const { name, photo, location, website, phone, email } = props;

  return (
    <div className="bootcampPersonalInfo">
      {/* Holds Image */}
      <div className="header">
        <div
          className="headerImage"
          style={{
            backgroundImage: `url(${BASE_URL}/uploads/${photo})`
          }}
        ></div>
      </div>
      {/* Container For the Information */}
      <div className="infoContainer">
        <div className="info">
          <h3>{name}</h3>
          <h4 id="location">{location.formattedAddress}</h4>
          <h4>{website}</h4>
          <h4>{phone}</h4>
          <h5>{email}</h5>
        </div>
      </div>
    </div>
  );
};

export default Personal;
