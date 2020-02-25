import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FormFieldProvider } from "./store/useFormField";

// import SimpleApp from "./SimpleApp";

// ReactDOM.render(<SimpleApp />, document.getElementById("app-root"));

ReactDOM.render(
  <FormFieldProvider>
    <App />
  </FormFieldProvider>,
  document.getElementById("app-root")
);
