import React from "react";
import "./style/dark.scss";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import {
  ListPageUser,
  ListPageStore,
  ListPageOrder,
  ListPageProduct,
} from "./pages/list/ListPage";

import NewPageUser from "./pages/new/NewPageUser";
import NewPageStore from "./pages/new/NewPageStore";
import NewPageOrder from "./pages/new/NewPageOrder";
import NewPageProduct from "./pages/new/NewPageProduct";

import PrivateRoutes from "./components/PrivateRoutes";

import { DarkModeContext } from "./context/darkModeContext";
import SinglePage from "./pages/single/SinglePage";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/">
            <Route index element={<HomePage />} />

            <Route path="users">
              <Route index element={<ListPageUser />} />
              {/* <Route path="myInfo" element={<SinglePage />} /> */}
              {/* <Route path=":userId" element={<SinglePage />} /> */}
              <Route
                path="edit/myInfo"
                element={<NewPageUser title="Edit User" />}
              />
              <Route
                path="edit/:userId"
                element={<NewPageUser title="Edit User" />}
              />
            </Route>

            <Route path="stores">
              <Route index element={<ListPageStore />} />
              <Route
                path="edit/:storeId"
                element={<NewPageStore title="Edit Store" />}
              />
            </Route>

            <Route path="orders">
              <Route index element={<ListPageOrder />} />
              <Route
                path="edit/:orderId"
                element={<NewPageOrder title="Edit Order" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<ListPageProduct />} />
              <Route
                path="edit/:productId"
                element={<NewPageProduct title="Edit Product" />}
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
