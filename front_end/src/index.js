import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PageProvider } from "./context/PageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeContextProvider>
    <PageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PageProvider>
  </DarkModeContextProvider>
);
