import { validate } from "../../utils/functions";
import { saveUserDataChanges } from "../../utils/backendCalls";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const handle_user_data_update = (e, facebook_id) => {
  const name = e.target.name;
  const value = e.target.value;

  // check for input errors
  const error = validate(value, name);

  return {
    type: UPDATE_USER_DATA,
    payload: {
      facebook_id: facebook_id,
      name: e.target.name,
      value: e.target.value,
      error: error
    }
  };
};

export const SAVE_CHANGES_SUCCESS = "SAVE_CHANGES_SUCCESS";
export const SAVE_CHANGES_FAIL = "SAVE_CHANGES_FAIL";

export const save_changes = user => dispatch => {
  saveUserDataChanges(dispatch, user);
};
