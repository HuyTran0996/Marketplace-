import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./navbarUserApp.scss";

import { PageContext } from "../../context/PageContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { showToast } from "../ToastMessage";
import { FetchCreateOrder } from "../../data/FetchOrdersData";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const NavbarUserApp = () => {
  const navigate = useNavigate();
  const { dispatchDarkMode, darkMode } = useContext(DarkModeContext);
  const { state, searchProductByName, getDataAllProducts, getMyInfo } =
    useContext(PageContext);
  const { dataCart, dataUser } = state;
  const [isLoading, setIsLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const moveToCartPage = async (e) => {
    e.preventDefault();
    const cookie = Cookies.get("jwtFe");

    if (cookie) {
      navigate("/userPage/cartPage");
    }
    if (!cookie) {
      showToast("Log In or Sign Up to use all functions", "warn");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const cookie = Cookies.get("jwtFe");

    if (cookie) {
      try {
        if (productName === "") {
          // await getDataAllProducts();
          navigate("/userPage");
        } else {
          // await searchProductByName(productName);
          navigate(`/userPage/search/${productName}`);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("ERROR....");
      }
    }
    if (!cookie) {
      try {
        if (productName === "") {
          // await getDataAllProducts();
          navigate("/public");
        } else {
          // await searchProductByName(productName);
          navigate(`/public/search/${productName}`);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("ERROR....");
      }
    }
  };

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

  return (
    <div className="wrapperOfUserApp">
      <form className="searchOfUserApp" onSubmit={handleSubmit}>
        <input
          className="inputOfUserApp"
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
          <span>
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
          </span>
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

export default NavbarUserApp;
