import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/index.css";
import "typeface-roboto";
import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
