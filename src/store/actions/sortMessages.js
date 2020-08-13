import * as actionTypes from "./actionTypes";

export const addSort = (filter, filtered) => {
  return dispatch => {
    try {
      dispatch(sortMessagesStart());
      dispatch(sortMessagesAdd(filter));
      dispatch(sortMessages(filtered));
    } catch (err) {
      dispatch(sortMessagesFail(err));
    }
  };
};

export const removeSort = (filter, filtered) => {
  return dispatch => {
    try {
      dispatch(sortMessagesStart());
      dispatch(sortMessagesRemove(filter));
      dispatch(sortMessages(filtered));
    } catch (err) {
      dispatch(sortMessagesFail(err));
    }
  };
};

export const sortMessagesAdd = filter => {
  return {
    type: actionTypes.SORT_MESSAGES_ADD,
    filter
  };
};

export const sortMessagesRemove = filter => {
  return {
    type: actionTypes.SORT_MESSAGES_REMOVE,
    filter
  };
};

export const sortMessages = filtered => {
  return {
    type: actionTypes.SORT_MESSAGES,
    filtered
  };
};

export const sortMessagesStart = () => {
  return {
    type: actionTypes.SORT_MESSAGES_START
  };
};

export const sortMessagesFail = error => {
  return {
    type: actionTypes.SORT_MESSAGES_FAIL,
    error
  };
};

export const sortReset = () => {
  return {
    type: actionTypes.SORT_RESET
  };
};
