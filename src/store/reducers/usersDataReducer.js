import {FETCH_DATA} from "../actions/fetchServerDataActions";
import { UPDATE_USER_DATA } from "../actions/usersDataActions";

const initialState = [];

const usersDataReducer = (state = initialState, {type, payload}) => {
switch(type){
    default: 
    return state;
    case FETCH_DATA:
        return payload.usersData;
    case UPDATE_USER_DATA:
        const usersData = [...state];
        const index = usersData.findIndex(user => user.facebook_id === payload.facebook_id);
        const searchedUser = usersData[index];
        const updatedUser = {...searchedUser, [payload.name]: payload.value};
        usersData[index] = updatedUser;
        return usersData;
    }
}

export default usersDataReducer;