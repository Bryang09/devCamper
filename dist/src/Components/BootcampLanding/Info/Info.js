import React from "react";
import Personal from "./Personal/Personal";

import "./Info.scss";

const Info = props => {
  const { name, photo, location, website, phone, email } = props;
  return (
    <>
      <Personal
        name={name}
        photo={photo}
        location={location}
        website={website}
        phone={phone}
        email={email}
      />
      <div className="bootcampInfo">
        <h4>personalinfo</h4>
      </div>
    </>
  );
};

export default Info;
