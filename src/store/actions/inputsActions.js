import { validate } from "../../utils/functions";

export const HANDLE_INPUT = "HANDLE_INPUT";

export const handle_input = e => {
  const name = e.target.name;
  const value = e.target.value;

  const error = validate(value, name);

  return {
    type: HANDLE_INPUT,
    payload: {
      name: name,
      value: value,
      error: error
    }
  };
};

export const SAVE_INPUT_ERROR = "SAVE_INPUT_ERROR";

export const save_input_error = (name, error) => {
  return {
    type: SAVE_INPUT_ERROR,
    payload: {
      name: name,
      error: error
    }
  };
};

export const CLEAR_INPUT_ERROR = "CLEAR_INPUT_ERROR";

export const clear_input_error = name => {
  return {
    type: CLEAR_INPUT_ERROR,
    payload: {
      name: name
    }
  };
};
