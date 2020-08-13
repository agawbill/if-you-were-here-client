import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./Layout.module.css";

const Layout = props => {
  return (
    <Container className={styles.ContentContainer}>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
