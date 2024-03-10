import { useNavigate } from "react-router-dom";
import "./widget.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";

const Widget = ({ type, totalNumber }) => {
  const navigate = useNavigate();
  let dataWidget;
  const amount = totalNumber;

  switch (type) {
    case "user":
      dataWidget = {
        title: "USERS",
        isUser: true,
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

  const widgetClass = `widget ${
    type === "user"
      ? "widget--user"
      : type === "order"
      ? "widget--order"
      : type === "store"
      ? "widget--store"
      : ""
  }`;

  const handleClick = (type) => {
    switch (type) {
      case "user":
        navigate("/adminPage/users");
        break;
      case "order":
        navigate("/adminPage/orders");
        break;
      case "store":
        navigate("/adminPage/stores");
        break;
      default:
        break;
    }
  };

  return (
    <div className={widgetClass} onClick={() => handleClick(type)}>
      <div className="upper">{dataWidget.icon}</div>
      <div className="down">
        <span className="counter">{amount}</span>
        <span className="title">{dataWidget.title}</span>
      </div>
    </div>
  );
};

export default Widget;
