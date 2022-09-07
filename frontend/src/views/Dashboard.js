import axios from "axios";
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes

// reactstrap components
import { Button, Row, Col, Collapse, Card, CardBody } from "reactstrap";
import LoginButton from "../components/Auth0/LogInButton";
import LogoutButton from "../components/Auth0/LogOutButton";
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
  const { user, isAuthenticated, isLoading } = useAuth0();

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
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </Row>

        <Row>
          <Col>
            <Button block color="primary" onClick={() => toggleCollapse()}>
              Open the flood gates of the never ending backlog
            </Button>
            <Collapse isOpen={collapseIsOpen}>
              <BacklogTable
                issues={issues.filter((issue) => issue.status === "backlog")}
                setReFetchData={setReFetchData}
              />
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Button block color="primary" onClick={() => toggleModal()}>
            New Issue
          </Button>
        </Row>
        <Row>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues.filter((issue) => issue.status === "in_progress")}
              setReFetchData={setReFetchData}
            />
          </Col>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues.filter((issue) => issue.status === "QA")}
              setReFetchData={setReFetchData}
            />
          </Col>
          <Col md="4">
            <IssueList
              loading={loading}
              issues={issues.filter((issue) => issue.status === "resolved")}
              setReFetchData={setReFetchData}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
