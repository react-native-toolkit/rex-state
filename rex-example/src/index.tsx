import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import App from "./App";

const { RexProvider } = store;

ReactDOM.render(
  <RexProvider>
    <App />
  </RexProvider>,
  document.getElementById("app-root")
);
