import React, { useState } from "react";
import MessageSnapshot from "../../components/MessageSnapshot/MessageSnapshot";
import LoadMore from "../../components/UI/Buttons/LoadMore/LoadMore";

//in the future, if there were to be more than 1000 posts lets say, I would load 500 posts at a time (via the api), and use the
//useEffect hook to call the api to load another 500 posts once messageCutoff reached a certain point (like 470)
//to maximize efficiency and speed

const LoadMoreContainer = (props) => {
  const [messagesCutoff, setMessagesCutoff] = useState(14);
  const [filteredCutoff, setFilteredCutoff] = useState(14);

  //calculate how many messages can be loaded that aren't already displayed
  //if each respective value is greater than 0, the loadmore button should display
  const filteredCalculation = props.filteredMessages.length - filteredCutoff;
  const messageCalculation = props.messages.length - messagesCutoff;

  //calculate the marker (the amount of posts to load... another 14, or if there are less than 14 left to load,
  //the remaining amount) and set the cutoff
  const loadMoreFilteredMessages = (count) => {
    const marker = filteredCalculation >= count ? count : filteredCalculation;
    setFilteredCutoff((prevState) => prevState + marker);
  };

  const loadMoreMessages = (count) => {
    const marker = messageCalculation >= count ? count : messageCalculation;
    setMessagesCutoff((prevState) => prevState + marker);
  };

  let loadMessages = null;
  let loadedMessages = null;

  //display the loadmore for unfiltered messages, or display the loadmore (button and messages) for filtered messages.
  if (props.filteredMessages.length > 14) {
    loadMessages = (
      <LoadMore
        show={filteredCalculation > 0}
        loadMoreMessages={loadMoreFilteredMessages}
      />
    );

    loadedMessages = props.filteredMessages
      .slice(14, filteredCutoff)
      .map((message, index) => {
        return (
          <MessageSnapshot
            key={index}
            entry={message}
            marker={index + 14}
          ></MessageSnapshot>
        );
      });
  } else if (props.messages.length > 14 && !props.filtered) {
    loadMessages = (
      <LoadMore
        show={messageCalculation > 0}
        loadMoreMessages={loadMoreMessages}
      />
    );

    loadedMessages = props.messages
      .slice(14, messagesCutoff)
      .map((message, index) => {
        return (
          <MessageSnapshot
            key={index}
            entry={message}
            marker={index + 14}
          ></MessageSnapshot>
        );
      });
  }

  return (
    <>
      {loadedMessages}
      {loadMessages}
    </>
  );
};

export default LoadMoreContainer;
