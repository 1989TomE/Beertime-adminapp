import {FETCH_DATA} from "../actions/fetchServerDataActions";
import { UPDATE_USER_DATA, SAVE_CHANGES_SUCCESS, SAVE_CHANGES_FAIL } from "../actions/usersDataActions";

const initialState = {
    usersData: [],
    usersDataBackup: [],
};

const usersDataReducer = (state = initialState, {type, payload}) => {
switch(type){
    default: 
    return state;

    case FETCH_DATA:
        return {
           usersData: payload.usersData, 
           usersDataBackup: payload.usersData, 
        }

    case UPDATE_USER_DATA: 
        {const usersData = [...state.usersData];
        const index = usersData.findIndex(user => user.facebook_id === payload.facebook_id);
        const searchedUser = usersData[index];
        const updatedUser = {...searchedUser, [payload.name]: payload.value};
        usersData[index] = updatedUser;
        return {...state, usersData: usersData};}

    case SAVE_CHANGES_SUCCESS:
       { const usersData = [...state.usersData];
        return {...state, usersDataBackup: usersData};}

    case SAVE_CHANGES_FAIL:
       { const usersDataBackup = [...state.usersDataBackup];
        return {...state, usersData: usersDataBackup};}
    }
}

export default usersDataReducer;
