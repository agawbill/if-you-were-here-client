import React, { useState, useReducer, useEffect } from "react";
import styles from "./MessageForm.module.css";
import Modal from "../../components/UI/Modal/Modal";
import Identity from "../../components/Identity/Identity";
import Who from "../../components/Who/Who";
import FormMessage from "../../components/FormMessage/FormMessage";
import Summary from "../../components/Summary/Summary";
import FormSpinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";
import { useDispatch, useSelector } from "react-redux";
import { submitMessage, submitMessageReset } from "../../store/actions";
import MessageComplete from "../../components/MessageComplete/MessageComplete";

const initialState = {
  identity: { identityId: null, identityName: null },
  who: { whoId: null, whoName: null },
  message: " ",
};

const formReducer = (formState, action) => {
  switch (action.type) {
    case "identity":
      return {
        ...formState,
        identity: {
          ...formState.identity,
          ...action.value,
        },
      };
    case "who":
      return {
        ...formState,
        who: {
          ...formState.who,
          ...action.value,
        },
      };
    case "message":
      return {
        ...formState,
        message: action.value,
      };
    case "reset":
      return {
        ...initialState,
      };
    case "submit":
      return {
        ...formState,
      };
    default:
      break;
  }
};

const MessageForm = () => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const [open, setOpen] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(0);
  const messageSuccess = useSelector((state) => state.message.messageSuccess);
  const messageLoading = useSelector((state) => state.message.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageSuccess) {
      setSubmitSuccess(true);
      dispatchForm({ type: "reset" });
      dispatch(submitMessageReset());
    }
  }, [messageSuccess, dispatch]);

  const openHandler = () => setOpen((oldState) => !oldState);

  const successHandler = () => {
    dispatch(submitMessageReset());
    openHandler();
    setSectionIndex(0);
  };

  const switchHandler = (type, name, formValue) => {
    if (type === "next" && sectionIndex === sections.length - 1) {
      setSectionIndex((prevIndex) => prevIndex);
      dispatchForm({ type: name, value: formValue });
    } else if (type === "next") {
      setSectionIndex((prevIndex) => prevIndex + 1);
      dispatchForm({ type: name, value: formValue });
    } else if (type === "prev") {
      setSectionIndex((prevIndex) => prevIndex - 1);
      dispatchForm({ type: name, value: formValue });
    } else if (type === "submit") {
      dispatchForm({ type: name });
      const body = {
        identity: formState.identity.identityId,
        who: formState.who.whoId,
        message: formState.message,
      };
      dispatch(submitMessage(body));
      setSectionIndex(4);
    }
  };

  const sections = [
    <Identity
      switchHandler={switchHandler}
      identityValue={formState.identity}
    />,
    <Who switchHandler={switchHandler} whoValue={formState.who} />,
    <FormMessage
      switchHandler={switchHandler}
      messageValue={formState.message}
    />,
    <Summary
      switchHandler={switchHandler}
      messageValue={formState.message}
      whoValue={formState.who}
      identityValue={formState.identity}
    />,
    <MessageComplete success={submitSuccess} resetSuccess={successHandler} />,
  ];

  let messageFormBody = sections[sectionIndex];

  if (messageLoading) {
    messageFormBody = <FormSpinner />;
  }

  return (
    <>
      <Modal open={open} openHandler={openHandler}>
        {messageFormBody}
      </Modal>
      <div className={styles.TextBox} onClick={() => openHandler()}>
        Enter Here <span className={styles.TypeWriter}>|</span>
      </div>
    </>
  );
};

export default MessageForm;
