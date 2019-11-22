import {FETCH_DATA} from "../actions/rootActions";

const initialState = [];

const usersDataBackupReducer = (state = initialState, {type, payload}) => {
switch(type){
    default: 
    return state;
    case FETCH_DATA:
        return payload.usersDataBackup;
    }
}

export default usersDataBackupReducer;