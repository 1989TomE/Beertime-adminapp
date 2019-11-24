export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const update_user_data = (e) => {

    return {
        type: UPDATE_USER_DATA,
        payload: {
            facebook_id: e.target.getAttribute("facebook_id"), 
            name: e.target.name,
            value: e.target.value,
        }
    }
}