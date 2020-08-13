import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Close from "../../UI/Buttons/Close/Close";

const Modal = props => {
  let classes = [styles.Modal];

  if (props.open) {
    classes = [styles.Modal, styles.ModalOpen];
  }

  return (
    <div className={styles.ModalContainer}>
      <Backdrop show={props.open} toggleBackdrop={props.openHandler} />
      <div className={classes.join(" ")}>
        <Close openHandler={props.openHandler}>X</Close>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
