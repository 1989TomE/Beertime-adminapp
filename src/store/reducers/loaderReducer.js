import { SHOW_LOADER, HIDE_LOADER } from "../actions/loaderActions";

const init = true;

const loaderReducer = (state = init, { type, payload }) => {
  switch (type) {
    default:
      return state;

    case SHOW_LOADER: {
      return true;
    }

    case HIDE_LOADER:
      return false;
  }
};

export default loaderReducer;
