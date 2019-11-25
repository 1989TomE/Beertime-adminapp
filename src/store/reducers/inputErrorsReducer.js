import {HANDLE_INPUT} from "../actions/inputsActions"
import {saveAndDisplayInputErrors} from "../../utils/functions"


const init = {};

const inputsErrorsReducer = (state = init, {type, payload}) => {
    switch(type) {
        default: return state;
        case HANDLE_INPUT: 
        saveAndDisplayInputErrors(payload.error, payload.name, state);
        if (payload.error !== null) return {...state, [payload.name]: payload.error};
        else {
            const errors = {...state};
            delete errors[payload.name];
            return errors;
        }
    }
}

export default inputsErrorsReducer;