import $ from "jquery";
import { toast } from "react-toastify";
import {deepClone} from "../utils/functions";
import {FETCH_DATA} from "../store/actions/fetchServerDataActions"

export const ajaxSetup = () => {
  $.ajaxSetup({ cache: false });
};

export const handleAjaxError = error => {
  if (error.status >= 400 && error.status <= 500) {
    toast.error(error.message || "Ups, někde se stala chyba");
  } else {
    //console.log(error);
    toast.error("Neočekáváná chyba při spojení se serverem");
  }
};

export const apiEndPoint = process.env.REACT_APP_SERVER_URL;

export const http = {
  get: $.get,
  post: $.post
};

export const fetchServerData = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const response = await http.get(apiEndPoint + "mainData.php", {
      limit: 100,
      token: token
    });

    const data = JSON.parse(response);

    if (data.usersData) {
      const usersDataBackup = deepClone(data.usersData);
      dispatch({type: FETCH_DATA, payload: {webData: data.webData, usersData: data.usersData, usersDataBackup: usersDataBackup}})
    }

  } catch (error) {
    handleAjaxError(error);
    if (error.type === "auth") {
      localStorage.clear();
      window.location.reload(false);
    }
    dispatch({type: "default"});
  }
}
