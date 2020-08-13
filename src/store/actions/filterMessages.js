import * as actionTypes from "./actionTypes";
import { sortMessages } from "./index";

export const addFilter = (filter, name, filtered, sort) => {
  return dispatch => {
    try {
      dispatch(filterMessagesStart());
      dispatch(filterMessagesAdd(filter, name));
      dispatch(filterMessages());
      if (sort) {
        dispatch(sortMessages(filtered));
      }
    } catch (err) {
      dispatch(filterMessagesFail(err));
    }
  };
};

export const removeFilter = (filter, name, filtered, sort) => {
  return dispatch => {
    try {
      dispatch(filterMessagesStart());
      dispatch(filterMessagesRemove(filter, name));
      dispatch(filterMessages());
      if (sort) {
        dispatch(sortMessages(filtered));
      }
    } catch (err) {
      dispatch(filterMessagesFail(err));
    }
  };
};

export const filterMessagesAdd = (filter, name) => {
  return {
    type: actionTypes.FILTER_MESSAGES_ADD,
    filter,
    name
  };
};

export const filterMessagesRemove = (filter, name) => {
  return {
    type: actionTypes.FILTER_MESSAGES_REMOVE,
    filter,
    name
  };
};

export const filterMessages = () => {
  return {
    type: actionTypes.FILTER_MESSAGES
  };
};

export const filterMessagesStart = () => {
  return {
    type: actionTypes.FILTER_MESSAGES_START
  };
};

export const filterMessagesFail = error => {
  return {
    type: actionTypes.FILTER_MESSAGES_FAIL,
    error
  };
};

export const filterReset = () => {
  return {
    type: actionTypes.FILTER_RESET
  };
};
