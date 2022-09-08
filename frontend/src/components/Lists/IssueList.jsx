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

//setRefecthData is used to rerender the parent component after a successful POST request to the database
//status indicates the list, and the child component IssueCard, in which state their issues are (in_progress, QA or resolved)
const IssueList = ({ loading, issues, setReFetchData, status }) => {
  return (
    <>
      <Card className="card-tasks">
        <CardHeader>
          <h6 className="title d-inline">
            Issues that are {status} ({issues?.length})
          </h6>
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
