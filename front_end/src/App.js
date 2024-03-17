import React, { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/dark.scss";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import HomePage from "./pages/home/HomePage";
import HomePageUser from "./pages/home/HomePageUser";
import YourStoreProducts from "./pages/home/YourStoreProducts";

import SearchPageUserApp from "./pages/search/SearchPageUserApp";

import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import ChangePasswordPage from "./pages/login/ChangePasswordPage";
import AdminChangeUserPasswordPage from "./pages/login/AdminChangeUserPasswordPage";

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
import { showToast } from "./components/ToastMessage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(DarkModeContext);
  const { state } = useContext(PageContext);
  const [firstLoad, setFirstLoad] = useState(true);

  const checkRole = () => {
    const cookie = Cookies.get("jwtFe");
    let decoded;
    // Check if the JWT token exists before attempting to decode it

    const isUserPage = location.pathname.startsWith("/userPage");
    const isAdminPage = location.pathname.startsWith("/adminPage");
    const isSignupPage = location.pathname.startsWith("/signup");
    const isLoginPage = location.pathname.startsWith("/login");
    const isChangePassword = location.pathname.startsWith("/changePassword");
    const isPublic = location.pathname.startsWith("/public");

    // If the JWT token does not exist or the role is not set, redirect to login
    if (isSignupPage || isLoginPage || isChangePassword || isPublic) {
      return;
    }

    if (!cookie && (isUserPage || isAdminPage)) {
      navigate("/public");
      showToast("Log In or Sign Up to use all functions", "warn");
      // return;
    }
    if (cookie) {
      decoded = jwtDecode(cookie);
      if (decoded.role === "admin" && !isAdminPage) {
        showToast("you are not a user", "warn");
        navigate("/adminPage");
        return;
      }

      if (decoded.role === "user" && isAdminPage) {
        showToast("you are not an admin", "warn");
        navigate("/userPage");
        return;
      }
    }
  };

  useEffect(() => {
    checkRole();
  }, [location, navigate]);

  useEffect(() => {
    if (firstLoad) {
      const cookie = Cookies.get("jwtFe");
      if (!cookie) {
        navigate("/public");
      }
      if (cookie) {
        let decoded = jwtDecode(cookie);
        if (decoded.role === "admin") {
          navigate("/adminPage");
          return;
        }

        if (decoded.role === "user") {
          navigate("/userPage");
          return;
        }
      }
      setFirstLoad(false);
    }
  }, [navigate, firstLoad]);

  return (
    <div className={darkMode ? "app-dark" : "app"}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />

        <Route path="/public">
          <Route index element={<HomePageUser />} />
          <Route path="search/:genre" element={<SearchPageUserApp />} />
        </Route>

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
            <Route
              path="adminChangeUserPassword/:userId"
              element={<AdminChangeUserPasswordPage />}
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
