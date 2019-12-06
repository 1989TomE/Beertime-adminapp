import $ from "jquery";
import { toast } from "react-toastify";
import { deepClone } from "../utils/functions";
import { FETCH_DATA } from "../store/actions/fetchServerDataActions";
import {
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_FAIL
} from "../store/actions/usersDataActions";
import { hide_loader, show_loader } from "./../store/actions/loaderActions";
import store from "../store/store";
import { isLoggedIn } from "./auth";

export const ajaxSetup = () => {
  $.ajaxSetup({ cache: false });

  $(document).ajaxStart(() => {
    store.dispatch(show_loader());
  });

  $(document).ajaxStop(() => {
    setTimeout(() => {
      store.dispatch(hide_loader());
    }, 500);
  });
};

export const handleAjaxError = error => {
  if (error.status >= 400 && error.status <= 500) {
    toast.error(error.message || "Ups, někde se stala chyba");
  } else {
    toast.error("Neočekáváná chyba při spojení se serverem");
  }
};

export const apiEndPoint = process.env.REACT_APP_SERVER_URL;

export const http = {
  get: $.get,
  post: $.post
};

export const fetchServerData = async dispatch => {
  if (isLoggedIn() === true) {
    try {
      const token = localStorage.getItem("token");

      const response = await http.get(apiEndPoint + "mainData.php", {
        limit: 100,
        token: token
      });
      const data = JSON.parse(response);
      const usersDataBackup = deepClone(data.usersData);

      dispatch({
        type: FETCH_DATA,
        payload: {
          webData: data.webData,
          usersData: data.usersData,
          usersDataBackup: usersDataBackup
        }
      });
    } catch (error) {
      handleAjaxError(error);
      if (error.type === "auth") {
        localStorage.clear();
        window.location.reload(false);
      }
    }
  }
};

export const saveUserDataChanges = async (dispatch, user) => {
  try {
    const dataToServer = JSON.stringify(user);

    const response = await http.post(apiEndPoint + "update_user_data.php", {
      data: dataToServer
    });
    const data = JSON.parse(response);

    if (data.response === "success") toast.success("Změny byly uloženy");

    dispatch({
      type: SAVE_CHANGES_SUCCESS,
      payload: null
    });
  } catch (error) {
    handleAjaxError(error);
    dispatch({
      type: SAVE_CHANGES_FAIL,
      payload: null
    });
  }
};

export const login = async (email, password) => {
  try {
    //send ajax to server and validate there
    let data = await http.post(apiEndPoint + "login.php", {
      email: email,
      password: password
    });

    data = $.parseJSON(data);
    if (data.response === "fail") {
      toast.error("Nesprávný email nebo heslo");
    } else if (data.response === "success") {
      localStorage.setItem("token", data.jwt);
      window.location.href = "/webData";
    }
  } catch (error) {
    toast.error(error);
  }
};
