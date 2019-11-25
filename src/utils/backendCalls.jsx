import $ from "jquery";
import { toast } from "react-toastify";
import {deepClone} from "../utils/functions";
import {FETCH_DATA} from "../store/actions/fetchServerDataActions"
import {SAVE_CHANGES_SUCCESS, SAVE_CHANGES_FAIL} from "../store/actions/usersDataActions"

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

      const usersDataBackup = deepClone(data.usersData);
      dispatch({type: FETCH_DATA, payload: {webData: data.webData, usersData: data.usersData, usersDataBackup: usersDataBackup}})

  } catch (error) {
    handleAjaxError(error);
    if (error.type === "auth") {
      localStorage.clear();
      window.location.reload(false);
    }
   dispatch({type: "default"});
  }
}

export const saveUserDataChanges = async (dispatch, user) => {
   
  try {
      const dataToServer = JSON.stringify(user);

      const response = await http.post(apiEndPoint + "update_user_data.php", {
          data: dataToServer,
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
}
