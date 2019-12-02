import jwtDecode from "jwt-decode";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import { login } from "../utils/backendCalls";
import { save_input_error } from "../store/actions/inputsActions";
import store from "../store/store";

export const handle_login = dispatch => {
  const email = store.getState().inputs.email;
  const password = store.getState().inputs.password;

  //validation
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "cz", "eu"] }
    }),
    password: Joi.string().min(1)
  });

  const errors = {};
  const result = schema.validate({ email: email, password: password });

  // error in input
  if (result.error) {
    const field = result.error.details[0].path[0];
    const errorMessage = result.error.details[0].message;
    errors[field] = errorMessage;
    toast.error(errorMessage);
    dispatch(save_input_error(field, errorMessage));
  } else {
    login(email, password);
  }
};

export const isLoggedIn = () => {
  try {
    // token must be set, max 3600 sec for session
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const sevenDaysBefore = new Date().getTime() / 1000 - 3600 * 24 * 7;
    return token !== null && decoded.time > sevenDaysBefore ? true : false;
  } catch (error) {
    return false;
  }
};
