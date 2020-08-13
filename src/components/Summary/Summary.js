import React from "react";
import Button from "../UI/Buttons/FormButton/FormButton";
import styles from "./Summary.module.css";
import parse from "html-react-parser";

const Summary = (props) => {
  return (
    <>
      <h3>Review</h3>
      <div className={styles.SummaryContainer}>
        <h5>
          I am a
          <span className={styles.SummaryAnswer}>
            {" "}
            {props.identityValue.identityName}
          </span>
        </h5>
        <h5>
          Writing to my{" "}
          <span className={styles.SummaryAnswer}>{props.whoValue.whoName}</span>
        </h5>
        <h5>And I want to say...</h5>
        <div className={styles.MessageContainer}>
          <span className={styles.SummaryAnswer}>
            {parse(props.messageValue)}
          </span>
        </div>
      </div>
      <Button type="prev" name="submit" switchHandler={props.switchHandler} />
      <Button
        type="submit"
        name="submit"
        switchHandler={props.switchHandler}
        validated={true}
      />
    </>
  );
};

export default Summary;
