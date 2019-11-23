import TOGGLE_CHECKBOX from "../actions/toggleCheckboxActions";

const init = {
    userCount: "checked",
    userActivity: "",
};

const checkboxesReducer = (state = init, {type, payload}) => {
switch(type) {
default: return state;
case TOGGLE_CHECKBOX:
    return {...state, [payload.name]: payload.value}
}
}

export default checkboxesReducer;