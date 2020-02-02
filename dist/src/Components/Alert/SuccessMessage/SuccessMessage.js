import React from "react";

import "./SuccessMessage.scss";

const Success = props => {
  const { sent } = props;

  if (sent) {
    return (
      <div className={`Success Active`}>
        <h5>
          Message Sent <br /> Please Check Inbox
        </h5>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Success;
