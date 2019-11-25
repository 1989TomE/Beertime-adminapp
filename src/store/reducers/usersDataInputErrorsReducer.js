import { UPDATE_USER_DATA } from "../actions/usersDataActions";
import {saveAndDisplayInputErrors} from "../../utils/functions"


const initialState = {};

const usersDataInputErrorsReducer = (state = initialState, {type, payload}) => {
switch(type){
    default: 
    return state;
    case UPDATE_USER_DATA:
        saveAndDisplayInputErrors(payload.error, payload.name, state);
        if (payload.error !== null) return {...state, [payload.name]: payload.error};
        else {
            const errors = {...state};
            delete errors[payload.name];
            return errors;
        }
    }
}

export default usersDataInputErrorsReducer;