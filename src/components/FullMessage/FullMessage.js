import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import styles from "./FullMessage.module.css";
import { fetchMessage, resetMessage } from "../../store/actions";
import { useParams, withRouter } from "react-router-dom";
import Spinner from "../UI/Spinners/FormSpinner/FormSpinner";

const FullMessage = (props) => {
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const message = currentMessage
    ? currentMessage
    : props.history.location.passedMessage;
  const error = useSelector((state) => state.message.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const passedMessage = props.history.location.passedMessage;
    if (!passedMessage) {
      dispatch(fetchMessage(id));
    }
    return () => dispatch(resetMessage());
  }, [id, dispatch]);

  let messageBody = <Spinner />;

  if (message && Object.keys(message).length > 0) {
    const date = new Date(message.createdAt).toDateString();
    messageBody = (
      <>
        <p>
          <b>
            To my{" "}
            <span className={styles.MessageAttribute}>{message.who.name}</span>
          </b>
          ,
          <br />
          <span className={styles.MessageDate}>{date}</span>
        </p>
        <span className={styles.MessageMessage}>{parse(message.message)}</span>
        <p>
          <b>
            From your{" "}
            <span className={styles.MessageAttribute}>
              {message.identity.name}
            </span>
          </b>
        </p>
      </>
    );
  }

  if (error) {
    messageBody = (
      <center>
        <span style={{ color: "red", fontWeight: "bold" }}>
          Sorry, an error has occurred and IT has been notified:
        </span>
        <span style={{ color: "white" }}> {error}</span>
      </center>
    );
  }

  return <div>{messageBody}</div>;
};

export default withRouter(FullMessage);
