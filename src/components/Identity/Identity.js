import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Buttons/FormButton/FormButton";
import styles from "./Identity.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";

const Identity = (props) => {
  const [identityAnswer, setIdentityAnswer] = useState({
    identityId: null,
    identityName: null,
  });
  const persons = useSelector((state) => state.persons.persons);
  const personsError = useSelector((state) => state.persons.error);

  useEffect(() => setIdentityAnswer(props.identityValue), [
    props.identityValue,
  ]);

  const identityFilters = persons.map((person, index) => (
    <Form.Check
      inline
      type="radio"
      key={index}
      value={person._id}
      label={person.name}
      name="formHorizontalRadios"
      onChange={() => {
        const { _id: identityId, name: identityName } = person;
        setIdentityAnswer({ identityId, identityName });
      }}
    />
  ));

  let identityBody = <Spinner />;

  if (persons) {
    identityBody = (
      <>
        <h3>I am a ...</h3>
        <div className={styles.IdentityAnswer}>
          {identityAnswer.identityName}
        </div>
        <div className={styles.IdentityContent}>
          <Form>
            <fieldset>
              <Form.Group as={Row}>
                <div className={styles.RadioContainer}>
                  <Col sm={12}>{identityFilters}</Col>
                </div>
              </Form.Group>
            </fieldset>
          </Form>
          <Button
            type="next"
            switchHandler={props.switchHandler}
            name="identity"
            validated={identityAnswer.identityName !== null}
            formValue={identityAnswer}
          />
        </div>
      </>
    );
  }

  if (personsError) {
    identityBody = (
      <>
        <span style={{ color: "red", fontWeight: "bold" }}>
          Sorry, an error has occurred and IT has been notified:
        </span>{" "}
        {personsError}
      </>
    );
  }

  return identityBody;
};

export default Identity;
