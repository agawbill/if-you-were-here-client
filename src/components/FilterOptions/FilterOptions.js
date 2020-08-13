import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FilterOptions.module.css";
import FilterOption from "./FilterOption/FilterOption";
import SortOption from "./SortOption/SortOption";
import Close from "../UI/Buttons/Close/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPen, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "../UI/Spinners/FormSpinner/FormSpinner";

const FilterOptions = (props) => {
  const [whoSelected, setWhoSelected] = useState(null);
  const [identitySelected, setIdentitySelected] = useState(null);
  const [sortSelected, setSortSelected] = useState(null);
  const persons = useSelector((state) => state.persons.persons);
  const personsError = useSelector((state) => state.persons.error);

  const filterHandler = (filter, name) => {
    if (whoSelected === filter && name === "who") {
      setWhoSelected(null);
    } else if (identitySelected === filter && name === "identity") {
      setIdentitySelected(null);
    } else if (name === "who") {
      setWhoSelected(filter);
    } else if (name === "identity") {
      setIdentitySelected(filter);
    }
  };

  const sortHandler = (filter) => {
    if (sortSelected === filter) {
      setSortSelected(false);
    } else {
      setSortSelected(filter);
    }
  };

  let parentClasses = styles.ContentViewer;
  let childClasses = styles.FilterOptions;

  if (props.expand) {
    parentClasses = [styles.ContentViewer, styles.ContentViewerOpen].join(" ");
    childClasses = [styles.FilterOptions, styles.OpenFilterOptions].join(" ");
  }

  const whoFilters = persons
    .sort((a, b) => a.position - b.position)
    .map((person, index) => (
      <FilterOption
        filterHandler={filterHandler}
        key={index}
        filterSelected={whoSelected}
        filter={person.name}
        name="who"
      />
    ));

  const identityFilters = persons
    .sort((a, b) => a.position - b.position)
    .map((person, index) => (
      <FilterOption
        filterHandler={filterHandler}
        key={index}
        filterSelected={identitySelected}
        filter={person.name}
        name="identity"
      />
    ));

  const sortOptions = ["Newest", "Oldest"].map((type, index) => (
    <SortOption
      sortHandler={sortHandler}
      key={index}
      sortSelected={sortSelected}
      filter={type}
    />
  ));

  let optionsBody = <Spinner />;

  if (persons) {
    optionsBody = (
      <>
        <span className={styles.CloseButton}>
          <Close openHandler={props.openHandler}>X</Close>
        </span>
        <Row>
          <Col lg={4}>
            <span className={styles.Header}>
              <FontAwesomeIcon
                icon={faPen}
                size="1x"
                style={{ color: "orange" }}
              />{" "}
              Addressed to
            </span>
            <br />
            {whoFilters}
          </Col>
          <Col lg={4} className={styles.FilterOptionsMiddle}>
            <span className={styles.Header}>
              <FontAwesomeIcon
                icon={faUserCheck}
                size="1x"
                style={{ color: "orange" }}
              />{" "}
              Sent by
            </span>
            <br />
            {identityFilters}
          </Col>
          <Col lg={4}>
            <span className={styles.Header}>
              <FontAwesomeIcon
                icon={faClock}
                size="1x"
                style={{ color: "orange" }}
              />{" "}
              By Date
            </span>
            <br />
            {sortOptions}
          </Col>
        </Row>
        <center>
          <span className={styles.SubmitButton}>
            <Close openHandler={props.openHandler}>OK</Close>
          </span>
        </center>
      </>
    );
  }

  if (personsError) {
    optionsBody = (
      <center>
        <span style={{ color: "red", fontWeight: "bold" }}>
          Sorry, an error has occurred and IT has been notified:
        </span>
        <span style={{ color: "white" }}> {personsError}</span>
      </center>
    );
  }

  return (
    <div className={styles.ContentContainer}>
      <div className={parentClasses}>
        <div className={childClasses}>
          <Container>
            <span className={styles.CloseButton}>
              <Close openHandler={props.openHandler}>X</Close>
            </span>
            {optionsBody}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
