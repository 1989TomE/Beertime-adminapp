import {FETCH_DATA} from "../actions/rootActions"

const init = [];

const webDataReducer = (state = init, {type, payload}) => {
    switch(type) {
        default: return state;
        case FETCH_DATA:
            return payload.webData;
    }
}

export default webDataReducer;