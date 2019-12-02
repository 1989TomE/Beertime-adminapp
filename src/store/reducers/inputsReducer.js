import { HANDLE_INPUT } from "../actions/inputsActions";

const init = {
  rowsToDisplay: 15,
  searchInput: "",
  email: "",
  password: ""
};

const inputsReducer = (state = init, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case HANDLE_INPUT:
      return { ...state, [payload.name]: payload.value };
  }
};

export default inputsReducer;
