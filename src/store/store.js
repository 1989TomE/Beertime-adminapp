import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import usersDataReducer from "./reducers/usersDataReducer";
import webDataReducer from "./reducers/webDataReducer";
import usersDataInputErrorsReducer from "./reducers/usersDataInputErrorsReducer";
import loaderReducer from "./reducers/loaderReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  usersDataHolder: usersDataReducer,
  webData: webDataReducer,
  usersDataInputErrors: usersDataInputErrorsReducer,
  loader: loaderReducer
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
