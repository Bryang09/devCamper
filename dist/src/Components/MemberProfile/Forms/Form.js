import React from "react";

import NoForm from "./NoForm/NoForm";
import Email from "./Email/Email";
import Password from "./Password/Password";
import Photo from "./Photo/Photo";

const Form = props => {
  const {
    onHandleInput,
    onUpdatePassword,
    formType,
    onFormType,
    onEmail,
    onSkip,
    onPhotoChange,
    onSubmitPhotoChange
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
  } else if (formType === "photo") {
    return (
      <Photo
        onPhotoChange={onPhotoChange}
        onSkip={onSkip}
        onSubmitPhotoChange={onSubmitPhotoChange}
      />
    );
  }
};

export default Form;
