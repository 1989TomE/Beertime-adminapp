import {FETCH_DATA} from "../actions/rootActions";

const initialState = [];

const usersDataReducer = (state = initialState, {type, payload}) => {
switch(type){
    default: 
    return state;
    case FETCH_DATA:
        return payload.usersData;
    }
}

export default usersDataReducer;