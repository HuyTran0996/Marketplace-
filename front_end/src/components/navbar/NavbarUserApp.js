import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { PageContext } from "../../context/PageContext";
import { DarkModeContext } from "../../context/darkModeContext";

const NavbarUserApp = () => {
  const { dispatchDarkMode, darkMode } = useContext(DarkModeContext);
  const { state, searchProductByName, getDataAllProducts } =
    useContext(PageContext);
  const { cartCounter, avatar } = state;
  const [isLoading, setIsLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (productName === "") {
        await getDataAllProducts();
      } else {
        await searchProductByName(productName);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("ERROR....");
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Product Name..."
            value={productName}
            onChange={handleChange}
          />
          {isLoading ? (
            <AutorenewIcon />
          ) : (
            <button className="button" type="submit" aria-label="Search">
              <SearchOutlinedIcon />
            </button>
          )}
          {error && <div className="error">Error: {error}</div>}{" "}
        </form>

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

          <div className="item">
            <ShoppingCartIcon className="icon" />
            <div className="counter">{cartCounter}</div>
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

export default NavbarUserApp;
