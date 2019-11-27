import {
  HANDLE_INPUT,
  SAVE_INPUT_ERROR,
  CLEAR_INPUT_ERROR
} from "../actions/inputsActions";
import { saveAndDisplayInputErrors } from "../../utils/functions";

const init = {};

const inputsErrorsReducer = (state = init, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case HANDLE_INPUT: {
      saveAndDisplayInputErrors(payload.error, payload.name, state);
      if (payload.error !== null)
        return { ...state, [payload.name]: payload.error };
      else {
        const errors = { ...state };
        delete errors[payload.name];
        return errors;
      }
    }
    case SAVE_INPUT_ERROR:
      return { ...state, [payload.name]: payload.error };
    case CLEAR_INPUT_ERROR: {
      const state = { ...state };
      delete state[payload.name];
      return state;
    }
  }
};

export default inputsErrorsReducer;
