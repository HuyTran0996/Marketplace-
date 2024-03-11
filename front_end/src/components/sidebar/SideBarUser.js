import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./sidebar.scss";
import { apiService } from "../../app/apiService";
import { PageContext } from "../../context/PageContext";
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
  const navigate = useNavigate();
  const { dispatchDarkMode } = useContext(DarkModeContext);
  const { state, dispatch, getDataAllProducts } = useContext(PageContext);

  const handleLogOut = async (e) => {
    localStorage.removeItem("favorite");
    // dispatch({
    //   type: "SET_DATA_CART",
    //   payload: [],
    // });
    Cookies.remove("forFe");
    Cookies.remove("jwtFe");

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
      dispatch({ type: "RESET" });
      return result;
    } catch (error) {
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.response.data.message;
      alert(errorName);
    }
  };
  const getProductByGenre = async (genre) => {
    navigate("/userPage", { state: { genre } });
  };
  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">BuyIt</div>
      </div>

      <div className="center">
        <ul>
          <p className="title">HOME</p>
          <Link to="/userPage" style={{ textDecoration: "none" }}>
            <li onClick={() => getProductByGenre()}>
              <HomeIcon className="icon" />
              <span>Home Page</span>
            </li>
          </Link>

          <p className="title">GENRES</p>

          <li onClick={() => getProductByGenre("Foods")}>
            <FastfoodIcon className="icon" />
            <span>Foods</span>
          </li>
          <li onClick={() => getProductByGenre("Devices")}>
            <DevicesIcon className="icon" />
            <span>Devices</span>
          </li>
          <li onClick={() => getProductByGenre("Stationery")}>
            <AutoStoriesIcon className="icon" />
            <span>Stationery</span>
          </li>
          <li onClick={() => getProductByGenre("Others")}>
            <ExploreIcon className="icon" />
            <span>Others</span>
          </li>

          <p className="title">YOUR STORE</p>
          <Link to="/userPage/stores" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Your Store Info</span>
            </li>
          </Link>

          <Link
            to="/userPage/stores/yourStoreOrdersProduct"
            style={{ textDecoration: "none" }}
          >
            <li>
              <CreditCardIcon className="icon" />
              <span>Your Store Order</span>
            </li>
          </Link>

          <Link
            to="/userPage/stores/yourStoreProducts"
            style={{ textDecoration: "none" }}
          >
            <li>
              <CategoryIcon className="icon" />
              <span>Your Store Products</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/userPage/myOrders" style={{ textDecoration: "none" }}>
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
            onClick={() => dispatchDarkMode({ type: "LIGHT" })}
          />
          <div
            className="colorOption"
            onClick={() => dispatchDarkMode({ type: "DARK" })}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarUser;
