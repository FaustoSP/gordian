import axios from "axios";
import { useState } from "react";
import {
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import Issue from "../../pojo/Issue";
import { AvForm, AvField } from "availity-reactstrap-validation";

const ModalNewIssue = ({ modalIsOpen, toggleModal, setReFetchData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const saveIssue = () => {
    const issue = new Issue(title, body);
    axios
      .post("http://localhost:8080/api/issue", issue)
      .then(() => setReFetchData(Date.now()));
    toggleModal();
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <AvForm onValidSubmit={saveIssue}>
          <ModalHeader toggle={toggleModal}>
            Add a new issue. It will be automatically assigned to the backlog.
          </ModalHeader>
          <ModalBody>
            <Label>Title</Label>
            <AvField
              type="text"
              name="title"
              placeholder="Type a concise title"
              id="title"
              className="text-primary"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Field must not be empty",
                },
                maxLength: { value: 25, errorMessage: "Too long" },
              }}
            />
            <Label>Description</Label>
            <AvField
              type="textarea"
              name="body"
              placeholder="Type a detailed description"
              id="body"
              className="text-muted"
              onChange={(e) => {
                setBody(e.target.value);
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
          </ModalBody>
          <ModalFooter>
            <FormGroup>
              <Button className="m-3" color="primary">
                Create!
              </Button>
            </FormGroup>
            <Button className="m-3" color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </>
  );
};

export default ModalNewIssue;
