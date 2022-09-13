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
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function Map() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState();

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

  useEffect(() => {
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  console.log(userMetadata?.role);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {userMetadata?.role === "admin" && (
                    <div className="typography-line">
                      <Row
                        className="align-items-center"
                        style={{ height: "550px" }}
                      >
                        <Col md="12">
                          <h2 style={{ textAlign: "center" }}>
                            You must be an administrator to access this page.
                          </h2>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {userMetadata?.role !== "admin" && (
                    <div className="typography-line">
                      <Row
                        className="align-items-center"
                        style={{ height: "550px" }}
                      >
                        <Col md="12">
                          <h2 style={{ textAlign: "center" }}>
                            You must be an administrator to access this page.
                          </h2>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
