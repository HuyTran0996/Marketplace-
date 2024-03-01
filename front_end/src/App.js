import React from "react";
import "./style/dark.scss";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import ListPage from "./pages/list/ListPage";
import NewPage from "./pages/new/NewPage";
import SinglePage from "./pages/single/SinglePage";

import PrivateRoutes from "./components/PrivateRoutes";

import { DarkModeContext } from "./context/darkModeContext";

import { productInputs, userInputs } from "./formSource";

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
              {/* <Route path="myInfo" element={<SinglePage />} /> */}
              {/* <Route path=":userId" element={<SinglePage />} /> */}
              <Route
                path="edit/myInfo"
                element={<NewPage title="Edit User" />}
              />
              <Route
                path="edit/:userId"
                element={<NewPage title="Edit User" />}
              />
            </Route>

            <Route path="stores">
              <Route index element={<ListPage />} />
              <Route
                path="edit/:storeId"
                element={<NewPage title="Edit Store" />}
              />
            </Route>

            <Route path="orders">
              <Route index element={<ListPage />} />
              <Route
                path="edit/:orderId"
                element={<NewPage title="Edit Order" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<ListPage />} />
              <Route
                path="edit/:productId"
                element={<NewPage title="Edit Product" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
