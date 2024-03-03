import { useContext, useState } from "react";

import "./navbar.scss";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const NavbarProduct = () => {
  const [productName, setProductName] = useState("");
  const handleChange = (e) => {
    setProductName(e.target.value);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search Product Name..."
            value={productName}
            onChange={handleChange}
          />
          <SearchOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default NavbarProduct;
