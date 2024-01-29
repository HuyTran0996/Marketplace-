import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import storeProvider from "./store/Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <storeProvider>
    <App />
  </storeProvider>
);
