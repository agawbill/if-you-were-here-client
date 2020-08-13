import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Buttons/FormButton/FormButton";
import styles from "./Who.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";

const Who = (props) => {
  const [whoAnswer, setWhoAnswer] = useState({ whoId: null, whoName: null });
  const persons = useSelector((state) => state.persons.persons);
  const personsError = useSelector((state) => state.persons.error);

  useEffect(() => setWhoAnswer(props.whoValue), [props.whoValue]);

  const whoFilters = persons.map((person) => (
    <Form.Check
      inline
      type="radio"
      value={person._id}
      label={person.name}
      name="formHorizontalRadios"
      onChange={() => {
        const { _id: whoId, name: whoName } = person;
        setWhoAnswer({ whoId, whoName });
      }}
    />
  ));

  let whoBody = <Spinner />;

  if (persons) {
    whoBody = (
      <>
        <h3>Writing to my ...</h3>
        <div className={styles.WhoAnswer}>{whoAnswer.whoName}</div>
        <div className={styles.WhoContent}>
          <Form>
            <fieldset>
              <Form.Group as={Row}>
                <div className={styles.RadioContainer}>
                  <Col sm={12}>{whoFilters}</Col>
                </div>
              </Form.Group>
            </fieldset>
          </Form>
          <Button
            type="prev"
            switchHandler={props.switchHandler}
            name="who"
            formValue={whoAnswer}
          />{" "}
          <Button
            type="next"
            switchHandler={props.switchHandler}
            name="who"
            formValue={whoAnswer}
            validated={whoAnswer.whoName !== null}
          />
        </div>
      </>
    );
  }

  if (personsError) {
    whoBody = (
      <>
        <span style={{ color: "red", fontWeight: "bold" }}>
          Sorry, an error has occurred and IT has been notified:
        </span>{" "}
        {personsError}
      </>
    );
  }

  return <>{whoBody}</>;
};

export default Who;
