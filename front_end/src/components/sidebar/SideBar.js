import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./sidebar.scss";
import { apiService } from "../../app/apiService";
import { DarkModeContext } from "../../context/darkModeContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const handleLogOut = async (e) => {
    // e.preventDefault();
    Cookies.remove("forFe");

    try {
      const result = await apiService.post(
        "/users/logout",
        {
          email: "",
          password: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result;
    } catch (error) {
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.response.data.message;
      alert(errorName);
    }
  };
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>

      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/stores" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stores</span>
            </li>
          </Link>

          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/users/edit/myInfo" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <Link
            to="/login"
            onClick={handleLogOut}
            style={{ textDecoration: "none" }}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="bottom">
        <p className="title">THEMES</p>
        <div className="options">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          />
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
