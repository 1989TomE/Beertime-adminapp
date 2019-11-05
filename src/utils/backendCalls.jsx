import $ from "jquery";
import { toast } from "react-toastify";

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
