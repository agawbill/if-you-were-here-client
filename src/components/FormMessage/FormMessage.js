import React, { useState, useEffect } from "react";
import Button from "../UI/Buttons/FormButton/FormButton";
import styles from "./FormMessage.module.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

const FormMessage = (props) => {
  const [formMessageAnswer, setFormMessageAnswer] = useState("");

  const onChangeEditor = (event, editor) => {
    const data = editor.getData();
    setFormMessageAnswer(data);
  };

  useEffect(() => {
    setFormMessageAnswer(props.messageValue);
  }, [props.messageValue]);

  return (
    <>
      <h3>My message ...</h3>
      <div className={styles.FormMessageContent}>
        <CKEditor
          editor={BalloonEditor}
          data={formMessageAnswer}
          config={{
            toolbar: ["bold", "italic", "|", "undo", "redo"],
          }}
          onChange={onChangeEditor}
        />
        <Button
          type="prev"
          switchHandler={props.switchHandler}
          name="message"
          formValue={formMessageAnswer}
        />
        <Button
          type="next"
          switchHandler={props.switchHandler}
          name="message"
          validated={
            formMessageAnswer !== "" &&
            formMessageAnswer.trim().indexOf(" ") !== -1
          }
          formValue={formMessageAnswer}
        />
      </div>
    </>
  );
};

export default FormMessage;
