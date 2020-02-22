import React from "react";

const About = props => {
  const {
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi
  } = props;

  console.log(careers);

  const careerMap = careers.map((res, i) => {
    return <li key={i}>{res}</li>;
  });

  const otherGroup = [
    { id: 0, text: "Housing", value: housing },
    { id: 1, text: "Job Assistance", value: jobAssistance },
    { id: 2, text: "Job Guarantee", value: jobGuarantee },
    { id: 3, text: "Accept Gi", value: acceptGi }
  ];

  const groupMap = otherGroup.map(res => {
    const { id, text, value } = res;
    return (
      <li
        key={id}
        style={
          value
            ? { textDecoration: "none" }
            : { textDecoration: "line-through", color: "#333" }
        }
      >
        {text}
      </li>
    );
  });

  console.log(otherGroup);

  return (
    <div className="aboutSection">
      <div className="sectionContainer">
        <div className="section about">
          <h3>About Us</h3>
          <h5>{description}</h5>
        </div>
        <div className="section courses">
          <h3>Courses</h3>
          <div className="sectionListContainer">
            <ul>{careerMap}</ul>
          </div>
        </div>
        <div className="section other">
          <h3>Other</h3>
          <div className="sectionListContainer">
            <ul>{groupMap}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
