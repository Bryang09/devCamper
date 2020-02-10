import React from "react";

const Photo = props => {
  const { onSkip, onPhotoChange, onSubmitPhotoChange } = props;
  return (
    <>
      <div className="input imgUpload">
        <label htmlFor="photo">Upload Photo</label>
        <input type="file" name="photo" onChange={onPhotoChange} />
      </div>
      <div className="submit">
        <h5 onClick={onSubmitPhotoChange}>Submit</h5>
        <h5 className="skip" onClick={onSkip}>
          Skip
        </h5>
      </div>
    </>
  );
};

export default Photo;
