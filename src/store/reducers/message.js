import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentMessage: null,
  messageSuccess: null,
  setSuccess: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGE_START:
      return {
        ...state,
        loading: true,
        // setSuccess: null,
      };
    case actionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        currentMessage: action.message,
        // setSuccess: true,
        loading: false,
      };
    case actionTypes.FETCH_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        currentMessage: null,
        // setSuccess: false,
        error: `${action.error}`,
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        currentMessage: null,
        // setSuccess: null,
        error: null,
        loading: false,
      };

    // submit message logic below
    case actionTypes.SUBMIT_MESSAGE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SUBMIT_MESSAGE_SUCCESS:
      return {
        ...state,
        messageSuccess: true,
        loading: true,
      };
    case actionTypes.SUBMIT_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SUBMIT_MESSAGE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        messageSuccess: null,
      };
    default:
      return state;
  }
};

export default reducer;
