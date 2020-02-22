import React from "react";
import Personal from "./Personal/Personal";
import About from "./About/About";
import "./Info.scss";

const Info = props => {
  const {
    name,
    photo,
    location,
    website,
    phone,
    email,
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi
  } = props;
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
      <About
        description={description}
        careers={careers}
        housing={housing}
        jobAssistance={jobAssistance}
        jobGuarantee={jobGuarantee}
        acceptGi={acceptGi}
      />
    </>
  );
};

export default Info;
