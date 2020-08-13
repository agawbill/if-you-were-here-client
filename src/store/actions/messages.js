import * as actionTypes from "./actionTypes";

export const fetchMessages = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchMessagesStart());
      const response = await fetch("/api/messages", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      dispatch(fetchMessagesSuccess(data.data));
    } catch (err) {
      dispatch(fetchMessagesFail(err));
    }
  };
};

export const fetchMessagesStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_START,
  };
};

export const fetchMessagesSuccess = (messages) => {
  const filteredMessages = messages.filter((message) => message.approved);
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    messages: filteredMessages,
  };
};

export const fetchMessagesFail = (error) => {
  return {
    type: actionTypes.FETCH_MESSAGES_FAIL,
    error,
  };
};

export const fetchMessagesReset = () => {
  return {
    type: actionTypes.RESET_MESSAGE,
  };
};
