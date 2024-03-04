import { useContext, useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PageContext } from "../../context/PageContext";

const NavbarStore = () => {
  const { getDataAllStores } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (storeName === "") {
        await getDataAllStores();
      } else {
        await getDataAllStores(storeName);
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
            placeholder="Search Store Name..."
            value={storeName}
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
      </div>
    </div>
  );
};

export default NavbarStore;
