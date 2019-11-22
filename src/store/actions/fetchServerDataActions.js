import $ from "jquery";
import { handleAjaxError, http, apiEndPoint } from "../../utils/backendCalls";
import {deepClone} from "../../utils/functions";

export const FETCH_DATA = "FETCH_DATA";

export const fetch_data = async (dispatch) => {

    try {
      const token = localStorage.getItem("token");

      let data = await http.get(apiEndPoint + "smainData.php", {
        limit: 100,
        token: token
      });

      data = $.parseJSON(data);
      const webData = data.webData;
      const usersData = data.usersData;
      const usersDataBackup = deepClone(data.usersData);

      dispatch({type: FETCH_DATA, payload: {webData: webData, usersData: usersData, usersDataBackup: usersDataBackup}})
    } catch (error) {
      handleAjaxError(error);
      if (error.type === "auth") {
        localStorage.clear();
        window.location.reload(false);
      }
    }
}