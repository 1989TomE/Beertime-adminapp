export const TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX";

export const toggle_checkbox = (e) => {
    console.log(e.target.name)
    return {
        type: TOGGLE_CHECKBOX,
        payload: {name: e.target.name, value: e.target.value}
    }
}
