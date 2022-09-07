import React from "react";
import {
  Card,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  Table,
  Spinner,
} from "reactstrap";
import IssueCard from "../DataDisplay/IssueCard";

const IssueList = ({ loading, issues, setReFetchData }) => {
  return (
    <>
      <Card className="card-tasks">
        <CardHeader>
          <h6 className="title d-inline">Tasks(5)</h6>
          <p className="card-category d-inline"> today</p>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              className="btn-icon"
              color="link"
              data-toggle="dropdown"
              type="button"
            >
              <i className="tim-icons icon-settings-gear-63" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuLink" right>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Something else
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>
                {loading ? (
                  <Spinner />
                ) : (
                  issues.map((issue) => (
                    <IssueCard issue={issue} setReFetchData={setReFetchData} />
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default IssueList;
