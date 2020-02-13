import React from "react";

const About = props => {
  const { description, careers } = props;

  console.log(careers);

  const careerMap = careers.map((res, i) => {
    return <li key={i}>{res}</li>;
  });

  return (
    <div className="aboutSection">
      <div className="sectionContainer">
        <div className="section about">
          <h3>About Us</h3>
          <h5>{description}</h5>
        </div>
        <div className="section courses">
          <h3>Courses</h3>
          <div className="coursesContainer">
            <ul>{careerMap}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
