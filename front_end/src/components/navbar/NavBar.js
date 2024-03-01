import { useContext } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const NavBar = () => {
  const { dispatch, darkMode } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>

        <div className="items">
          {/* <div className="item">
            {darkMode ? (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <Brightness5Icon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div> */}

          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}

          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}

          {/* <div className="item">
            <Link to="/users/id" style={{ textDecoration: "none" }}>
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
