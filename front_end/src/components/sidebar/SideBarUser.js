import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./sidebar.scss";
import { apiService } from "../../app/apiService";
import { DarkModeContext } from "../../context/darkModeContext";

import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DevicesIcon from "@mui/icons-material/Devices";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExploreIcon from "@mui/icons-material/Explore";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const SideBarUser = () => {
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
        <span className="logo">Marketplace</span>
      </div>

      <hr />

      <div className="center">
        <ul>
          <p className="title">HOME</p>
          <Link to="/userPage" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Home Page</span>
            </li>
          </Link>

          <p className="title">GENRES</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <FastfoodIcon className="icon" />
              <span>Foods</span>
            </li>
            <li>
              <DevicesIcon className="icon" />
              <span>Devices</span>
            </li>
            <li>
              <AutoStoriesIcon className="icon" />
              <span>Stationery</span>
            </li>
            <li>
              <ExploreIcon className="icon" />
              <span>Others</span>
            </li>
          </Link>

          <p className="title">ABOUT YOUR STORE</p>
          <Link to="/stores" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Your Store</span>
            </li>
          </Link>

          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Your Store Order</span>
            </li>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Your Store Products</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/users/edit/myInfo" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Your Orders</span>
            </li>
          </Link>

          <Link to="/userPage/edit/myInfo" style={{ textDecoration: "none" }}>
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

export default SideBarUser;
