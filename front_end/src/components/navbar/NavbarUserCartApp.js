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
  const { state, getMyInfo } = useContext(PageContext);
  const { dataCart, dataUser } = state;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getMyInfo();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const moveToCartPage = () => {
    navigate("/userPage/cartPage");
  };

  return (
    <div className="wrapper">
      <div></div>
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
            {dataUser?.data?.user.photo ? (
              <img
                src={dataUser.data.user.photo}
                alt="avatar"
                className="avatar"
              />
            ) : (
              <AccountCircleOutlinedIcon className="avatar" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarUserCartApp;
