import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = props => {
  let body = null;

  if (props.show) {
    body = (
      <div className={styles.Backdrop} onClick={props.toggleBackdrop}></div>
    );
  }

  return <>{body}</>;
};

export default Backdrop;
