import React from "react";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom";
import styles from "./MessageSnapshot.module.css";

const MessageSnapshot = (props) => {
  const selectorHandler = () => {
    props.history.push({
      pathname: `/message/${props.entry._id}`,
      passedMessage: props.entry,
    });
  };

  const summaryMessage = (message, count) => {
    const newBody = message.split(" ");

    if (newBody.length <= count) return message;

    const lastEl = newBody[count - 1].split("").slice(-1)[0];
    const punctuation = [".", "!", ",", "?", ";", ":", "&"];

    if (punctuation.indexOf(lastEl) !== -1) {
      return `${newBody.slice(0, count + 1).join(" ")}...`;
    }

    return `${newBody.slice(0, count).join(" ")}...`;
  };

  let divider = props.marker === 0 ? null : <hr />;

  const date = new Date(props.entry.createdAt).toDateString();

  return (
    <>
      {divider}
      <div className={styles.Message} onClick={() => selectorHandler()}>
        <p>
          To my{" "}
          <span className={styles.MessageAttribute}>
            {" "}
            {props.entry.who.name}
          </span>
          ,
          <br />
          <span className={styles.MessageDate}>{date}</span>
        </p>
        <span className={styles.MessageMessage}>
          {parse(summaryMessage(props.entry.message, 100))}
        </span>
        <p>
          From your{" "}
          <span className={styles.MessageAttribute}>
            {props.entry.identity.name}
          </span>
        </p>
      </div>
    </>
  );
};

export default withRouter(MessageSnapshot);
