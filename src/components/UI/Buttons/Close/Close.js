import React from "react";
import styles from "./Close.module.css";

const Close = (props) => {
  const closeStyles =
    props.children === "OK" ? styles.SubmitButton : styles.CloseButton;
  return (
    <span className={closeStyles} onClick={props.openHandler}>
      {props.children}
    </span>
  );
};

export default Close;
