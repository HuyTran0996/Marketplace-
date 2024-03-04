import { useContext, useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PageContext } from "../../context/PageContext";

const NavbarOrder = () => {
  const { getDataAllOrders } = useContext(PageContext);

  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (orderId === "") {
        await getDataAllOrders();
      } else {
        await getDataAllOrders(orderId);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.message);

      setIsLoading(false);
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search By OrderId..."
            value={orderId}
            onChange={handleChange}
          />
          {isLoading ? (
            <>
              {error && <div className="error">Error: {error}</div>}{" "}
              <AutorenewIcon />
            </>
          ) : (
            <>
              {error && <div className="error">Error: {error}</div>}{" "}
              <button className="button" type="submit" aria-label="Search">
                <SearchOutlinedIcon />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default NavbarOrder;
