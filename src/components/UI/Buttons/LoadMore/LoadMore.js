import React from "react";
import styles from "./LoadMore.module.css";

const LoadMore = (props) => {
  let loadMessages = null;

  if (props.show) {
    loadMessages = (
      <div
        className={styles.LoadMore}
        onClick={() => props.loadMoreMessages(14)}
      >
        LOAD MORE
      </div>
    );
  }
  return loadMessages;
};

export default LoadMore;
