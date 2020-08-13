import React from "react";
import styles from "./ContentContainer.module.css";
import Back from "../../components/UI/Buttons/Back/Back";
import Container from "react-bootstrap/Container";

const ContentContainer = props => {
  return (
    <div className={styles.ContentContainer}>
      <div className={styles.HeaderContainer}>
        <span className={styles.BackButton}>
          <Back size="2x" path="/" />{" "}
        </span>
        <span className={styles.Header}>If You Were Here...</span>
      </div>
      <Container className={styles.ChildrenContainer}>
        {props.children}
      </Container>
    </div>
  );
};

export default ContentContainer;
