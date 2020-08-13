import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Back = props => {
  const backHandler = path => {
    props.history.push(path);
  };
  return (
    <FontAwesomeIcon
      icon={faArrowAltCircleLeft}
      size={props.size}
      style={{ color: "orange" }}
      onClick={() => backHandler(props.path)}
    />
  );
};

export default withRouter(Back);
