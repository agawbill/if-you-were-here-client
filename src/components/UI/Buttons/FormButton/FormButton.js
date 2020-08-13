import React from "react";
import styles from "./FormButton.module.css";

const FormButton = (props) => {
  let buttonText = null;
  switch (props.type) {
    case "next":
      buttonText = "Next";
      break;
    case "prev":
      buttonText = "Previous";
      break;
    case "submit":
      buttonText = "Submit";
      break;
    default:
      break;
  }

  let buttonBody = (
    <span
      className={
        !props.validated && props.type !== "prev"
          ? styles.ButtonInactive
          : styles.Button
      }
      onClick={() => {
        if (!props.validated && props.type !== "prev") {
          return;
        }
        props.switchHandler(props.type, props.name, props.formValue);
      }}
    >
      {buttonText}
    </span>
  );

  return <>{buttonBody}</>;
};

export default FormButton;
