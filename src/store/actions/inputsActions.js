import {validate} from "../../utils/functions"

export const HANDLE_INPUT = "HANDLE_INPUT";


export const handle_input = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(name);


    const error = validate(value, name);


    return {
        type: HANDLE_INPUT,
        payload: {
            name: name,
            value: value,
            error: error,
        }
    }
}