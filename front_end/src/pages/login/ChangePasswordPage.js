import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";
import "./login.scss";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordCurrentChange = (e) => {
    setPasswordCurrent(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    Cookies.remove("jwtFe");
    let requestBody = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    try {
      const result = await apiService.patch(
        "/users/updateMyPassword",
        {
          ...requestBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Changed password successfully, login with your new password");
      navigate("/login");
      return result;
    } catch (error) {
      alert("Changed password fail, Error system");
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.message;
      setMessage(errorName);
    }
  };

  const moveToLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>CHANGE PASSWORD PAGE</div>

          <div className="title">Current Password</div>
          <input
            type="password"
            placeholder="your current password..."
            value={passwordCurrent}
            onChange={handlePasswordCurrentChange}
          />

          <div className="title">New Password</div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="title">Password Confirm</div>
          <input
            type="password"
            placeholder="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />

          {message && <span>{message}</span>}
          <button type="submit">Submit</button>
          <button onClick={moveToLoginPage}>Move To Login Page</button>
        </form>
      )}
    </div>
  );
}
