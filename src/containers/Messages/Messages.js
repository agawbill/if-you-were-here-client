import React, { useEffect } from "react";
import styles from "./Messages.module.css";
import { useSelector } from "react-redux";
import LoadMoreContainer from "../LoadMoreContainer/LoadMoreContainer";
import MessageSnapshot from "../../components/MessageSnapshot/MessageSnapshot";
import MessageFilter from "../MessageFilter/MessageFilter";
import Spinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";

const Messages = () => {
  const messages = useSelector((state) => state.messages.messages);
  const messagesError = useSelector((state) => state.messages.error);
  const { who, identity } = useSelector((state) => state.messages.filters);
  const sort = useSelector((state) => state.messages.sort);
  const filteredMessages = useSelector(
    (state) => state.messages.filteredMessages
  );
  const messagesLoading = useSelector((state) => state.messages.loading);

  let messageFilter = messages.length > 0 ? <MessageFilter /> : null;

  let messagesContainer = messagesLoading ? <Spinner /> : null;

  if (who || identity || sort) {
    messagesContainer = filteredMessages.slice(0, 14).map((message, index) => {
      return (
        <MessageSnapshot
          key={index}
          entry={message}
          marker={index}
        ></MessageSnapshot>
      );
    });
  } else {
    messagesContainer = messages.slice(0, 14).map((message, index) => {
      return (
        <MessageSnapshot
          key={index}
          entry={message}
          marker={index}
        ></MessageSnapshot>
      );
    });
  }

  if (messagesError) {
    messagesContainer = (
      <>
        <span style={{ color: "red", fontWeight: "bold" }}>
          Sorry, an error has occurred and IT has been notified:
        </span>{" "}
        {messagesError}
      </>
    );
  }

  return (
    <>
      {messageFilter}
      <div className={styles.Messages}>
        {messagesContainer}
        <LoadMoreContainer
          messages={messages}
          filteredMessages={filteredMessages}
          filtered={who || identity}
        />
      </div>
    </>
  );
};

export default Messages;
