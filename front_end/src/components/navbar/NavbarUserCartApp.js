import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { PageContext } from "../../context/PageContext";
import { DarkModeContext } from "../../context/darkModeContext";

const NavbarUserCartApp = () => {
  const navigate = useNavigate();
  const { dispatchDarkMode, darkMode } = useContext(DarkModeContext);
  const { state } = useContext(PageContext);
  const { avatar, dataCart } = state;

  const [productName, setProductName] = useState("");

  const moveToCartPage = () => {
    navigate("/userPage/cartPage");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <span className={productName ? "search" : ""}></span>

        <div className="items">
          <div className="item">
            {darkMode ? (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatchDarkMode({ type: "TOGGLE" })}
              />
            ) : (
              <Brightness5Icon
                className="icon"
                onClick={() => dispatchDarkMode({ type: "TOGGLE" })}
              />
            )}
          </div>

          <div className="item" onClick={moveToCartPage}>
            <ShoppingCartIcon className="icon" />
            <div className="counter">{dataCart ? dataCart.length : 0}</div>
          </div>

          <div className="item">
            <Link to="/userPage/edit/myInfo" style={{ textDecoration: "none" }}>
              <img
                src={avatar ? avatar : <AccountCircleOutlinedIcon />}
                alt="avatar"
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUserCartApp;
