import "./widget.scss";
import { Link } from "react-router-dom";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Widget = ({ type, totalNumber }) => {
  let dataWidget;
  //temporary

  const amount = totalNumber || "Error";
  const diff = 20;

  switch (type) {
    case "user":
      dataWidget = {
        title: "USERS",
        isUser: true,
        link: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            <span>See all users</span>
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "order":
      dataWidget = {
        title: "ORDERS",
        isOrder: true,
        link: (
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <span>See all orders</span>
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "store":
      dataWidget = {
        title: "STORES",
        isStore: true,
        link: (
          <Link to="/stores" style={{ textDecoration: "none" }}>
            <span>See all stores</span>
          </Link>
        ),
        icon: (
          <StoreIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataWidget.title}</span>
        <span className="counter">
          {amount}
          {dataWidget.isStore && <StoreIcon />}
          {dataWidget.isOrder && <ShoppingCartOutlinedIcon />}
          {dataWidget.isUser && <PersonIcon />}
        </span>
        <span className="link">{dataWidget.link}</span>
      </div>
      <div className="right">{dataWidget.icon}</div>
    </div>
  );
};

export default Widget;
