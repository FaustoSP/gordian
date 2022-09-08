import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";

const IssueCard = ({ issue, setReFetchData }) => {
  const [bodyIsEditable, setBodyIsEditable] = useState(false);
  //If at any point any other field of the issue becomes manually editable from this card, fuse this two
  //state variables into a single one that is just the "issue" POJO
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const toggleEditBody = () => {
    setBodyIsEditable(!bodyIsEditable);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/issue/${id}`)
      .then(() => setReFetchData(Date.now()));
  };

  const handleEdit = () => {
    let updatedIssue = issue;
    updatedIssue.body = newBody;
    updatedIssue.title = newTitle;
    axios.put("http://localhost:8080/api/issue", updatedIssue).then(() => {
      setReFetchData(Date.now());
      toggleEditBody();
    });
  };

  const advanceState = () => {
    let updatedIssue = issue;
    if (updatedIssue.status === "in_progress") updatedIssue.status = "QA";
    else updatedIssue.status = "resolved";
    axios.put("http://localhost:8080/api/issue", updatedIssue).then(() => {
      setReFetchData(Date.now());
    });
  };

  return (
    <tr key={issue.id}>
      <td>
        <AvForm onValidSubmit={handleEdit}>
          <p className="title">
            {bodyIsEditable ? (
              <AvField
                name="editTitle"
                placeholder={issue.body}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Field must not be empty",
                  },
                  maxLength: { value: 25, errorMessage: "Too long" },
                }}
              />
            ) : (
              issue.title
            )}
            {!bodyIsEditable && (
              <>
                <Button
                  color="link"
                  id="tooltip636901683"
                  title=""
                  type="button"
                  onClick={() => handleDelete(issue.id)}
                >
                  <i className="tim-icons icon-trash-simple" />
                </Button>

                <Button
                  color="link"
                  id="tooltip636901683"
                  title=""
                  type="button"
                  onClick={() => toggleEditBody()}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
              </>
            )}
            {!bodyIsEditable && !(issue.status === "resolved") && (
              <Button
                color="link"
                id="tooltip636901683"
                title=""
                type="button"
                onClick={() => advanceState()}
              >
                <i className="tim-icons icon-double-right" />
              </Button>
            )}
          </p>
          <p className="text-muted">
            {bodyIsEditable ? (
              <AvField
                name="editBody"
                placeholder={issue.body}
                onChange={(e) => {
                  setNewBody(e.target.value);
                }}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Field must not be empty",
                  },
                  minLength: {
                    value: 5,
                    errorMessage: "Too short",
                  },
                  maxLength: {
                    value: 200,
                    errorMessage: "Too long",
                  },
                }}
              />
            ) : (
              issue.body
            )}
          </p>
          {bodyIsEditable && (
            <FormGroup>
              <Button
                color="link"
                id="tooltip636901683"
                title=""
                type="button"
                onClick={() => toggleEditBody()}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>

              <Button color="link" id="tooltip636901683" title="" type="submit">
                <i className="tim-icons icon-check-2" />
              </Button>
            </FormGroup>
          )}
        </AvForm>
      </td>
    </tr>
  );
};

export default IssueCard;
