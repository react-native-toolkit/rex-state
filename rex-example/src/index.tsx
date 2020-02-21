import React from "react";
import ReactDOM from "react-dom";
import { RexProvider } from "rex";
import store from "./store/store";
import App from "./App";
// import './index.css'

ReactDOM.render(
  <RexProvider store={store}>
    <App />
  </RexProvider>,
  document.getElementById("app-root")
);
