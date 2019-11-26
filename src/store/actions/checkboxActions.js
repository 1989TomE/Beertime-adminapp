export const TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX";

export const toggle_checkboxes = name => {
  return {
    type: TOGGLE_CHECKBOX,
    payload: {
      name: name
    }
  };
};
