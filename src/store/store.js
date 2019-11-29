import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import usersDataReducer from "./reducers/usersDataReducer";
import webDataReducer from "./reducers/webDataReducer";
import usersDataInputErrorsReducer from "./reducers/usersDataInputErrorsReducer";
import inputsReducer from "./reducers/inputsReducer";
import inputsErrorsReducer from "./reducers/inputErrorsReducer";


import thunk from "redux-thunk";

const rootReducer = combineReducers({usersData: usersDataReducer, webData: webDataReducer, usersDataInputErrors: usersDataInputErrorsReducer, inputs: inputsReducer, inputsErrors: inputsErrorsReducer});

const middleware = [thunk];

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
  

export default store;