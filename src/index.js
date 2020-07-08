import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { createAppStore } from "./createStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={createAppStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
