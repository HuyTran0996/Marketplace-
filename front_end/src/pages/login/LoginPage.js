import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";
import "./login.scss";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const { state, dispatch } = useContext(PageContext);

  const checkCookie = () => {
    const cookie = Cookies.get("forFe");
    if (!cookie) {
      const value = Date.now();
      Cookies.set("forFe", value, { expires: 2 });
      return;
    }
    return;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await apiService.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      checkCookie();
      navigate("/");
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.response.data.message;

      setErrorMessage(errorName);
    }
  };

  return (
    <div className="login">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>LOGIN PAGE</div>
          <div className="title">Email</div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="title">Password</div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errorMessage && <span>{errorMessage}</span>}
          <button type="submit">Login</button>
          <button>Forgot Password</button>
          <button>Sign Up</button>
        </form>
      )}
    </div>
  );
}
