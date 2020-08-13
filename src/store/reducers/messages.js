import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  filteredMessages: [],
  filters: { who: null, identity: null },
  sort: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...action.messages],
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: `${action.error}`,
      };
    case actionTypes.RESET_MESSAGES:
      return {
        loading: false,
        error: null,
      };

    //filter & sort logic below-- has to be in this reducer as it needs to be in same scope as messages
    case actionTypes.FILTER_MESSAGES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FILTER_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FILTER_MESSAGES_ADD:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.name]: action.filter,
        },
      };
    case actionTypes.FILTER_MESSAGES_REMOVE:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.name]: null,
        },
      };
    case actionTypes.FILTER_MESSAGES:
      const { who, identity } = state.filters;
      const messagesCopy = [...state.messages];
      const newFilteredMessages =
        who && identity
          ? messagesCopy.filter(
              (message) =>
                message.who.name === who && message.identity.name === identity
            )
          : messagesCopy.filter(
              (message) =>
                message.who.name === who || message.identity.name === identity
            );
      return {
        ...state,
        filteredMessages: [...newFilteredMessages],
        loading: false,
        error: null,
      };
    case actionTypes.FILTER_RESET:
      return {
        ...state,
        filteredMessages: [],
        loading: false,
        error: null,
      };
    case actionTypes.SORT_MESSAGES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SORT_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SORT_MESSAGES_ADD:
      return {
        ...state,
        sort: action.filter,
      };
    case actionTypes.SORT_MESSAGES_REMOVE:
      return {
        ...state,
        sort: false,
      };
    case actionTypes.SORT_MESSAGES:
      const filteredCopy = action.filtered
        ? [...state.filteredMessages]
        : [...state.messages];
      const sortedMessages =
        state.sort === "Oldest"
          ? filteredCopy.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          : filteredCopy.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
      return {
        ...state,
        filteredMessages: [...sortedMessages],
        loading: false,
        error: null,
      };
    case actionTypes.SORT_RESET:
      return {
        ...state,
        sort: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
