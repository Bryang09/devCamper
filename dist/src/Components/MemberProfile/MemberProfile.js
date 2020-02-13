import React, { Component } from "react";

import { BASE_URL } from "../../keys";

import { Redirect } from "react-router-dom";
import axios from "axios";

import "./MemberProfile.scss";

import Form from "./Forms/Form";
import Info from "./Info/Info";
import Error from "../Alert/ErrorMessage/Error";

export class MemberProfile extends Component {
  state = {
    tokenSuccess: null,
    user: false,
    name: null,
    email: null,
    newPassword: null,
    currentPassword: null,
    role: null,
    photo: null,
    formType: "none",
    statusCode: null,
    errMessage: null,
    goBack: false
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    //   Make sure there is a token
    if (localStorage.getItem("token") === null) {
      this.setState({ tokenSuccess: false });
    }

    // ------------------------------------------------
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const { name, email, photo, role } = res.data.data;
        this.setState({
          user: res.data.data,
          name,
          email,
          photo,
          role
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Change Which Form Displays

  onFormType = params => {
    this.setState({ formType: params });
  };

  // Handle User Input

  onHandleInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  // Return to /member/home
  onGoBack = () => {
    this.setState({ goBack: true });
  };

  // Skip Form
  onSkip = () => {
    this.setState({ formType: "none" });
  };

  // Get user information

  onGetUser = () => {
    const token = localStorage.getItem("token");

    // ------------------------------------------------
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const { name, email, photo, role } = res.data.data;
        this.setState({
          user: res.data.data,
          name,
          email,
          photo,
          role,
          errMessage: null,
          statusCode: null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Change Name Or Email
  onEmail = () => {
    const { user, name, email } = this.state;

    const token = localStorage.getItem("token");

    // Check if name of email where changed
    const checkName = user.name !== name;
    const checkEmail = user.email !== email;

    // If changed, send new data else send same data
    let newName = checkName ? name : user.name;
    let newEmail = checkEmail ? email : user.email;

    axios({
      method: "put",
      url: `${BASE_URL}/api/v1/auth/updatedetails`,
      data: {
        name: newName,
        email: newEmail
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res =>
        this.setState({
          formType: "none",
          user: res.data.data,
          errMessage: null,
          statusCode: null
        })
      )
      .catch(err => {
        const errorResponse = { err };
        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  // Change Password

  onUpdatePassword = () => {
    const { newPassword, currentPassword } = this.state;
    const token = localStorage.getItem("token");

    axios({
      method: "put",
      url: `${BASE_URL}/api/v1/auth/updatepassword`,
      data: {
        currentPassword: currentPassword,
        newPassword: newPassword
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res =>
        this.setState(
          { formType: "none", errMessage: null, statusCode: null },
          console.log(res)
        )
      )
      .catch(err => {
        const errorResponse = { err };
        // const { errorResponse } = errorRespone.err;
        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  onPhotoChange = e => {
    e.preventDefault();
    const newPhoto = e.target.files[0];

    this.setState({ photo: newPhoto });
  };

  // Change User Photo
  onSubmitPhotoChange = () => {
    const { user } = this.state;
    const token = localStorage.getItem("token");

    let formData = new FormData();

    formData.append("file", this.state.photo);

    axios
      .put(`${BASE_URL}/api/v1/users/${user._id}/photo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        this.setState(
          {
            formType: "none",
            photo: res.data.data,
            errMessage: null,
            statusCode: null
          },
          this.onGetUser,
          console.log(res)
        );
      })
      .catch(err => {
        const errorResponse = { err };
        // const { errorResponse } = errorRespone.err;
        const statusCode = errorResponse.err.response.status;
        const { error } = errorResponse.err.response.data;

        this.setState({ statusCode, errMessage: error });
      });
  };

  render() {
    const {
      tokenSuccess,
      name,
      email,
      photo,
      formType,
      user,
      errMessage,
      statusCode,
      goBack
    } = this.state;

    // There is no access token
    if (tokenSuccess === false) {
      return <Redirect to="/" />;
    }
    // Return to /member/home
    else if (goBack === true) {
      return <Redirect to="/member/home" />;
    }

    return (
      <div className="profileLanding">
        <Error errMessage={errMessage} statusCode={statusCode} />

        <div className="profileInfo">
          <Info user={user} goBack={this.onGoBack} photo={photo} />
        </div>
        <div className="profileLandingContainer">
          <div className="formContainer">
            <Form
              name={name}
              email={email}
              photo={photo}
              onHandleInput={this.onHandleInput}
              onSubmitChanges={this.onSubmitChanges}
              formType={formType}
              onFormType={this.onFormType}
              onEmail={this.onEmail}
              onUpdatePassword={this.onUpdatePassword}
              onSkip={this.onSkip}
              onPhotoChange={this.onPhotoChange}
              onSubmitPhotoChange={this.onSubmitPhotoChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MemberProfile;
