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

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Collapse } from "reactstrap";
import IssueList from "../components/Lists/IssueList";
import ModalNewIssue from "../components/Modals/ModalNewIssue";
import { useAuth0 } from "@auth0/auth0-react";
import BacklogTable from "../components/DataDisplay/BacklogTable";

function Dashboard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const [issues, setIssues] = useState();
  const [loading, setLoading] = useState(true);
  //state variable used to refetch the issues
  const [reFetchData, setReFetchData] = useState(0);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
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
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/issue").then((response) => {
      setLoading(false);
      setIssues(response.data);
      console.log(response.data);
    });
  }, [reFetchData]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleCollapse = () => {
    setCollapseIsOpen(!collapseIsOpen);
  };

  console.log(user);

  return (
    <>
      <div>
        <ModalNewIssue
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
          setReFetchData={setReFetchData}
        />
      </div>

      <div className="content">
        <Row>
          <Button block color="primary" onClick={() => toggleModal()}>
            New Issue
          </Button>
        </Row>
        <Row>
          <Col>
            <Button block color="primary" onClick={() => toggleCollapse()}>
              Open the flood gates of the never ending backlog
            </Button>
            <Collapse isOpen={collapseIsOpen}>
              <BacklogTable
                issues={issues?.filter((issue) => issue.status === "backlog")}
                setReFetchData={setReFetchData}
              />
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues?.filter((issue) => issue.status === "in_progress")}
              setReFetchData={setReFetchData}
              status={"in progress"}
            />
          </Col>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues?.filter((issue) => issue.status === "QA")}
              setReFetchData={setReFetchData}
              status={"in QA"}
            />
          </Col>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues?.filter((issue) => issue.status === "resolved")}
              setReFetchData={setReFetchData}
              status={"resolved"}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
