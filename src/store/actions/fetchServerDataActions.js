import { fetchServerData } from "../../utils/backendCalls";


export const FETCH_DATA = "FETCH_DATA";

export const fetch_data = (dispatch) => {
  const data = fetchServerData(dispatch);
}