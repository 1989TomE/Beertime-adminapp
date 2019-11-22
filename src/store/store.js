import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import usersDataReducer from "./reducers/usersDataReducer";
import usersDataBackupReducer from "./reducers/usersDataBackupReducer";
import webDataReducer from "./reducers/webDataReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({usersData: usersDataReducer, usersDataBackup: usersDataBackupReducer, webData: webDataReducer});

const middleware = [thunk];

const store = createStore(rootReducer,   compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

export default store;