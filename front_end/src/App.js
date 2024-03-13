import React, { useEffect, useState } from "react";
import "./style/dark.scss";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import HomePageUser from "./pages/home/HomePageUser";
import YourStoreProducts from "./pages/home/YourStoreProducts";

import SearchPageUserApp from "./pages/search/SearchPageUserApp";

import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import ChangePasswordPage from "./pages/login/ChangePasswordPage";

import NotFoundPage from "./pages/NotFoundPage";
import {
  ListPageUser,
  ListPageStore,
  ListPageOrder,
  ListPageProduct,
  ListPageCartProduct,
  ListPageOrderUserApp,
  ListPageOrderDetail,
  ListPageOrderDetailOfStore,
  ListPageOrderDetailOfStoreAdminApp,
} from "./pages/list/ListPage";

import NewPageUser from "./pages/new/NewPageUser";
import NewPageStore from "./pages/new/NewPageStore";
import NewPageOrder from "./pages/new/NewPageOrder";
import NewPageProduct from "./pages/new/NewPageProduct";
import NewPageDetailProduct from "./pages/new/NewPageDetailProduct";
import NewPageStoreOfUserApp from "./pages/new/NewPageStoreOfUserApp";
import NewPageCreateProduct from "./pages/new/NewPageCreateProduct";

import { PageContext } from "./context/PageContext";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(DarkModeContext);
  const { state } = useContext(PageContext);
  const [role, setRole] = useState("");

  const checkRole = () => {
    const cookie = Cookies.get("jwtFe");
    let decoded;
    // Check if the JWT token exists before attempting to decode it
    if (cookie) {
      decoded = jwtDecode(cookie);
    }
    const isProtectedRoute =
      location.pathname.startsWith("/adminPage") ||
      location.pathname.startsWith("/userPage");

    const isUserPage = location.pathname.startsWith("/userPage");
    const isAdminPage = location.pathname.startsWith("/adminPage");
    const isSignupPage = location.pathname.startsWith("/signup");
    const isLoginPage = location.pathname.startsWith("/login");
    const isChangePassword = location.pathname.startsWith("/changePassword");

    // If the JWT token does not exist or the role is not set, redirect to login
    if (isSignupPage || isLoginPage || isChangePassword) {
      return;
    }

    if (!decoded || !decoded.role) {
      navigate("/login");
      return;
    }

    if (decoded.role === "admin" && !isAdminPage) {
      navigate("/adminPage");
      return;
    }

    if (decoded.role === "user" && !isUserPage) {
      navigate("/userPage");
      return;
    }
  };

  useEffect(() => {
    checkRole();
  }, [location, navigate]);
  useEffect(() => {
    checkRole();
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />

        <Route path="/adminPage">
          <Route index element={<HomePage />} />

          <Route path="users">
            <Route index element={<ListPageUser />} />
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
            <Route
              path="orderDetail/:orderId"
              element={<ListPageOrderDetailOfStoreAdminApp />}
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
        {/* ////////////////////USER////////////////////// */}
        <Route path="/userPage/">
          <Route index element={<HomePageUser />} />

          <Route path="search/:genre" element={<SearchPageUserApp />} />

          <Route
            path="edit/myInfo"
            element={<NewPageUser title="Edit User" />}
          />

          <Route path="cartPage" element={<ListPageCartProduct />} />

          <Route
            path="detail/:productId"
            element={<NewPageDetailProduct title="Product Detail" />}
          />

          <Route path="myOrders" element={<ListPageOrderUserApp />} />
          <Route path="myOrders/:orderID" element={<ListPageOrderDetail />} />

          <Route path="stores">
            <Route
              index
              element={<NewPageStoreOfUserApp title="Your Store" />}
            />

            <Route
              path="yourStoreOrdersProduct"
              element={<ListPageOrderDetailOfStore />}
            />

            <Route path="yourStoreProducts">
              <Route index element={<YourStoreProducts />} />
              <Route
                path="edit/:productId"
                element={<NewPageProduct title="Edit Product" />}
              />
              <Route
                path="createProduct"
                element={<NewPageCreateProduct title="Create Product" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
