import React from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";

const BODY_CHARACTER_LIMIT = 80;

const truncateAndAddEllipsis = (str) => {
  return str.length > BODY_CHARACTER_LIMIT
    ? str.slice(0, BODY_CHARACTER_LIMIT - 1) + "\u2026"
    : str;
};

const BacklogTable = ({ issues, setReFetchData }) => {
  const advanceStatus = (issue) => {
    let updatedIssue = issue;
    updatedIssue.status = "in_progress";
    axios.put("http://localhost:8080/api/issue", updatedIssue).then(() => {
      setReFetchData(Date.now());
    });
  };

  const generateRow = (issue) => {
    return (
      <tr>
        <td>{issue.title}</td>
        <td>{truncateAndAddEllipsis(issue.body)}</td>
        <td>
          <Button
            color="secondary"
            size="sm"
            className="mr-1"
            onClick={() => advanceStatus(issue)}
          >
            Take
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th width="25%">Title</th>
            <th width="55%">Body</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>{issues?.map((issue) => generateRow(issue))}</tbody>
      </Table>
    </div>
  );
};

export default BacklogTable;
