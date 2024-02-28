import React from "react";
import "./style/dark.scss";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { productInputs, userInputs } from "./formSource";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ListPage from "./pages/list/ListPage";
import NewPage from "./pages/new/NewPage";
import SinglePage from "./pages/single/SinglePage";
import PrivateRoutes from "./components/PrivateRoutes";

import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="users">
              <Route index element={<ListPage />} />
              <Route path=":userId" element={<SinglePage />} />
              <Route
                path="new"
                element={<NewPage inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<ListPage />} />
              <Route path=":productId" element={<SinglePage />} />
              <Route
                path="new"
                element={
                  <NewPage inputs={productInputs} title="Add New Product" />
                }
              />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
