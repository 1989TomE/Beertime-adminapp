import { TOGGLE_CHECKBOX } from "../actions/checkboxActions";

const init = {
  rowsToDisplayCheckbox: "checked",
  activityCheckbox: ""
};

const checkboxesReducer = (state = init, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case TOGGLE_CHECKBOX:
      const oldValue = state[payload.name];
      const newValue = oldValue === "" ? "checked" : "";
      return { ...state, [payload.name]: newValue };
  }
};

export default checkboxesReducer;
