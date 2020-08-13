import React from "react";
import Close from "../UI/Buttons/Close/Close";
import styles from "./MessageComplete.module.css";

const MessageComplete = (props) => {
  let body = null;

  if (props.success) {
    body = (
      <div className={styles.MessageSuccess}>
        <h3>Submitted</h3>
        Your message has been submitted. It will be reviewed and screened by an
        admin, and if approved it will be added to the main page. Check back in
        a few hours to see if it's been added.
      </div>
    );
  } else {
    body = (
      <div className={styles.MessageFailure}>
        <h3>Failed</h3>
        Your message failed to be submitted. Please try again.
      </div>
    );
  }

  return (
    <>
      {body}
      <Close openHandler={props.resetSuccess}>OK</Close>
    </>
  );
};

export default MessageComplete;
