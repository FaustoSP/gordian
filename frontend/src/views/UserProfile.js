/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Row,
  Col,
  Fade,
} from "reactstrap";

function UserProfile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState();
  const [_reloadPage, setReloadPage] = useState();
  const [fadeIn, setFadeIn] = useState(false);

  const getUserMetadata = async () => {
    const domain = "dev-ddbdrxe2.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope:
          "read:current_user update:current_user_metadata update:users update:users_app_metadata",
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = () => {
    postUserMetadata().then(
      setReloadPage(() => Date.now()),
      setFadeIn(true),
      setTimeout(() => {
        setFadeIn(() => {
          return false;
        });
      }, "5000")
    );
  };

  const postUserMetadata = async () => {
    const domain = "dev-ddbdrxe2.us.auth0.com";
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope:
        "read:current_user update:current_user_metadata update:users update:users_app_metadata",
    });

    let options = {
      method: "PATCH",
      url: `https://${domain}/api/v2/users/${user.sub}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: { user_metadata: userMetadata },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(userMetadata);
    console.log(userMetadata?.team);
  }, [userMetadata]);

  useEffect(() => {
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      {isAuthenticated && (
        <div className="content">
          <Row>
            <Col md="8">
              <AvForm onValidSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <h5 className="title">Edit Profile</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Team</label>
                          <AvField
                            name="team"
                            placeholder={userMetadata?.team}
                            type="text"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                team: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <AvField
                            name="username"
                            placeholder={userMetadata?.username}
                            type="text"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                username: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <AvField
                            name="firstName"
                            placeholder={userMetadata?.firstName}
                            type="text"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Middle Name</label>
                          <AvField
                            name="middleName"
                            placeholder={userMetadata?.middleName}
                            type="text"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                middleName: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <AvField
                            name="lastName"
                            placeholder={userMetadata?.lastName}
                            type="text"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <AvField
                            name="aboutMe"
                            cols="80"
                            placeholder={userMetadata?.about}
                            rows="4"
                            type="textarea"
                            onChange={(e) => {
                              setUserMetadata((prevState) => ({
                                ...prevState,
                                about: e.target.value,
                              }));
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button className="btn-fill" color="primary" type="submit">
                      Save
                    </Button>
                    <Fade in={fadeIn} tag="h5" className="mt-3">
                      All changes saved!
                    </Fade>
                  </CardFooter>
                </Card>
              </AvForm>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href={user?.nickname}>
                      <img alt="..." className="avatar" src={user?.picture} />
                      <h5 className="title">
                        {userMetadata?.firstName
                          ? userMetadata?.firstName
                          : "FIRST"}{" "}
                        {userMetadata?.middleName
                          ? userMetadata?.middleName
                          : "MIDDLE"}{" "}
                        {userMetadata?.lastName
                          ? userMetadata?.lastName
                          : "LAST"}
                      </h5>
                    </a>
                    <p className="description">{userMetadata?.role}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      {!isAuthenticated && (
        <div className="typography-line">
          <Row className="align-items-center" style={{ height: "550px" }}>
            <Col md="12">
              <h2 style={{ textAlign: "center" }}>
                Log In to see your profile. You can use the button in the top
                right corner.
              </h2>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default UserProfile;
