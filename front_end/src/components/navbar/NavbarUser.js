import { useContext, useState } from "react";
import "./navbarUser.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PageContext } from "../../context/PageContext";
import { useNavigate } from "react-router-dom";

const NavbarUser = () => {
  const navigate = useNavigate();
  const { getDataAllUsers } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (email === "") {
        await getDataAllUsers("", 1, 8);
        navigate("/adminPage/users?page=1");
      } else {
        await getDataAllUsers(email);
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
            placeholder="Search By Email..."
            value={email}
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

export default NavbarUser;
